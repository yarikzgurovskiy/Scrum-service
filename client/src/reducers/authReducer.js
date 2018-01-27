import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.authUser, action) {
    switch (action.type) {
        case types.LOGIN_USER_SUCCESS: {
            return action.user;
        }
        case types.LOGOUT_USER_SUCCESS: {
            return null;
        }
        case types.UPDATE_USER_SUCCESS: {
            return action.user;
        }
        case types.CREATE_USER_SUCCESS: {
            return state;
        }
        default:
            return state;
    }
}