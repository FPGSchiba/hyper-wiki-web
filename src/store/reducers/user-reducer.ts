import { UserActionTypes } from '../actions/user';
import { GET_USER_SUCCESS } from '../constants/user';
import { UserState } from '../format';

const initialState: UserState = {
    user: null,
    loggedIn: false
};

export default function user(state = initialState, action: UserActionTypes): UserState {
    switch(action.type){
        case GET_USER_SUCCESS:
            return { ...state, user: action.user, loggedIn: action.user != null ? true: false};
        default: return state;
    }
}
