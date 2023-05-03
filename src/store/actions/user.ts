import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GET_USER_SUCCESS, GET_PERMISSIONS_SUCCESS } from '../constants/user';
import { AppState } from '../format';
import { IPermission, IUser } from '../format/type/userTypes';
import { ErrorResponse } from './shared';
import userManagementService from "../../services/user-management.service";
import { getUserInfoFromCookies, setTokenToCookies, setUserInfoToCookies } from '../../services/util';
import { Hash } from '../../components/Login/Util/hash';

export interface GetUserProfileSuccessAction extends Action<typeof GET_USER_SUCCESS> {
  user: IUser;
  token: string;
}

export interface GetPermissionsSuccessAction extends Action<typeof GET_PERMISSIONS_SUCCESS> {
  permissions: IPermission[];
}

export type UserActionTypes =
  | GetUserProfileSuccessAction
  | GetPermissionsSuccessAction;

type ThunkResult<R> = ThunkAction<R, AppState, undefined, UserActionTypes>;

export function getUserProfileSuccess(user: IUser, token: string): GetUserProfileSuccessAction {
  return {
    type: GET_USER_SUCCESS,
    user,
    token
  };
}

function getPermissionsSuccess(permissions: IPermission[]): GetPermissionsSuccessAction {
  return {
    type: GET_PERMISSIONS_SUCCESS,
    permissions
  }
}

export function doLogin(
    username: string,
    password: string,
    callback: (
      err?: ErrorResponse,
      data?: {
        message: string;
        token: string;
        expirationTime: string;
        user: IUser; // Store User Format
      },
    ) => void,
  ): ThunkResult<void> {
    return async function (dispatch: (arg0: any) => void) {
      try {
        const result = await userManagementService.login(username, Hash(password));
        dispatch(getUserProfileSuccess(result.user, result.token));
        setUserInfoToCookies({ expiredTime: result.expirationTime, user: result.user });
        setTokenToCookies(result.token, new Date(result.expirationTime));
        callback(null, result);
      } catch (err: any) {
        const error = err.response?.data || err;
        callback(error);
      }
    };
}

export function updateUserInfo(): ThunkResult<void>{
  return async function (dispatch: (arg0: any) => void) {
    const currentUser = await getUserInfoFromCookies();
    if (currentUser) dispatch(getUserProfileSuccess(currentUser.user, currentUser?.user.token));
  }
}

export function updatePermissions(): ThunkResult<void> {
  return async function (dispatch : (arg0: any) => void) {
    const result = await userManagementService.getPermissions();
    dispatch(getPermissionsSuccess(result));
  }
}

export function getAllUsers(callback: (data: IUser[]) => void): ThunkResult<void> {
  return async function () {
    const result = await userManagementService.getAllUsers();
    callback(result);
  }
}
