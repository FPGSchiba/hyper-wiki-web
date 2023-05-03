import { UserActionTypes } from '../actions/user';
import { GET_PERMISSIONS_SUCCESS, GET_USER_SUCCESS } from '../constants/user';
import { UserState } from '../format';

const initialState: UserState = {
    sessionToken: '',
    userToken: '',
    user: {
        id: '',
        token: '',
        username: '',
        password: '',
        names: {
            forename: '',
            surname: '',
            aliases: [
                ''
            ],
            preferred: ''
        }
    },
    permissions: [
    ]
};

export default function user(state = initialState, action: UserActionTypes): UserState {
    switch(action.type){
        case GET_USER_SUCCESS:
            return { ...state, user: action.user, userToken: action.user.token, sessionToken: action.token };
        case GET_PERMISSIONS_SUCCESS:
            return { ...state, permissions: action.permissions }
        default: return state;
    }
}
