import * as types from './actionTypes';
import * as apiUsers from '../api/users';
import * as auth from './../auth/index';

export function loginUserSuccess(user) {
    return { type: types.LOGIN_USER_SUCCESS, user }
}

export function logoutUserSuccess() {
    return { type: types.LOGOUT_USER_SUCCESS }
}

export function createUserSuccess() {
    return { type: types.CREATE_USER_SUCCESS };
}

export const loadUserSuccess = (user) => {
    return { type: types.LOAD_USER_SUCCESS, user };
}

export const updateUserSuccess = (user) => {
    return { type: types.UPDATE_USER_SUCCESS, user };
}

export function loginUser(user) {
    return dispatch => {
        return apiUsers.loginUser(user)
            .then(res => {
                auth.authUser(res.token);
                dispatch(loginUserSuccess(res.user));
            })
            .catch(err => { throw err; })
    }
}

export const createUser = (user) => {
    return dispatch => {
        return apiUsers.createUser(user)
            .then(res => {
                dispatch(createUserSuccess(res.user))
            })
            .catch(err => { throw err; })
    }
}

export const loadAuthUser = (userId) => {
    return dispatch => {
        if (userId) {
            return apiUsers.getUser(userId)
                .then(response => dispatch(loginUserSuccess(response.user)))
                .catch(err => {
                    throw err;
                })
        } else {
            return dispatch(logoutUser());
        }

    }
}

export const logoutUser = () => {
    return dispatch => {
        auth.deauthUser();
        dispatch(logoutUserSuccess());
    }
}



export const loadUser = (userId) => {
    return dispatch => {
        return apiUsers.getUser(userId)
            .then(response => dispatch(loadUserSuccess(response.user)))
            .catch(err => {
                throw err;
            })
    }
}

export const updateUserInfo = (userId, userInfo) => {
    return dispatch => {
        return apiUsers.updateUser(userId, userInfo)
            .then(response => dispatch(updateUserSuccess(response.user)))
            .catch(err => {
                throw err;
            })
    }
}





