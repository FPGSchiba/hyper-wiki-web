import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GET_USER_SUCCESS } from '../constants/user';
import { AppState } from '../format';
import { ErrorResponse } from './shared';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { signIn, signOut } from '../../services/amplify';

export interface GetUserSuccessAction extends Action<typeof GET_USER_SUCCESS> {
  user: CognitoUser | null;
}

export type UserActionTypes =
  | GetUserSuccessAction

type ThunkResult<R> = ThunkAction<R, AppState, undefined, UserActionTypes>;

export function getUserSuccess(user: CognitoUser | null): GetUserSuccessAction {
  return {
    type: GET_USER_SUCCESS,
    user
  };
}

export function doLogin(
    username: string,
    password: string,
    callback: (
      err?: ErrorResponse,
      user?: CognitoUser,
    ) => void,
  ): ThunkResult<void> {
    return async function (dispatch: (arg0: any) => void) {
      try {
        const user = await signIn(username, password);
        dispatch(getUserSuccess(user));
        callback(null, user);
      } catch (err: any) {
        const error = err.response?.data || err;
        callback(error);
      }
    };
}

export function federationLogin(user: CognitoUser | null, callback: (err?: ErrorResponse) => void): ThunkResult<void> {
  return async function (dispatch: (arg0: any) => void) {
    try {
      dispatch(getUserSuccess(user));
      callback(null);
    } catch (err: any) {
      const error = err.response?.data || err;
      callback(error);
    }
  };
}


export function doSignOut(callback: (err?: ErrorResponse) => void): ThunkResult<void> {
  return async function (dispatch: (arg0: any) => void) {
    try {
      signOut()
      dispatch(getUserSuccess(null));
      callback(null);
    } catch (err: any) {
      const error = err.response?.data || err;
      callback(error);
    }
  };
}
