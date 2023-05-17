import { CognitoUser } from 'amazon-cognito-identity-js';

export interface AppState {
    userState: UserState;
}


export interface UserState {
    user: CognitoUser | null;
    loggedIn: boolean;
}
