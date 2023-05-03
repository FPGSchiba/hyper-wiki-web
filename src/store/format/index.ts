import { IUserRights } from "./type/userTypes";

export interface AppState {
    currentUser: UserState
}

export interface UserState {
    sessionToken: string,
    userToken: string,
    user: IUserRights
}
