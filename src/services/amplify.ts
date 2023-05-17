import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib-esm/types';
import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
import Cookies from 'js-cookie';
import { Session } from 'inspector';

export async function signUp(email: string, username: string, password: string): Promise<CognitoUser> {
    const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
            email
        },
        autoSignIn: {
            enabled: true
        }
    });
    return user;
}

export async function resendConfirmationCode(username: string) {
    await Auth.resendSignUp(username);
}

export async function confirmSignUp(username: string, code: string) {
    await Auth.confirmSignUp(username, code);
}

export async function signIn(username: string, password: string) {
    const user = await Auth.signIn(username, password);
    return user;
}

export async function signOut() {
    await Auth.signOut();
    const cookies = Cookies.get();
    Object.keys(cookies).forEach((key) => {
      Cookies.remove(key);
    });
    localStorage.clear();
}

export async function federationSignInGoogle() {
    const credentials = await Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})
    console.log(credentials);
}

export async function getCurrentUser() {
    const user = await Auth.currentUserInfo();
    return user;
}

export async function isUserLoggedIn() {
    try {
        const session = await Auth.currentUserInfo();
        console.log(session)
        if (session) {
            return true;
        }
        return false
    } catch (err) {
        console.log(err);
        return false;
    }
}
