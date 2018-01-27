import * as auth from './../auth/index';
import React from 'react';
import { Redirect } from 'react-router-dom';

const AuthMiddleware = ({ children }) => {
    return auth.isUserAuth()
        ? children
        : <Redirect to={{
            pathname: '/signin',
            state: {
                message: {
                    visibility: true,
                    text: 'You must login to see previous page',
                    type: 'danger'
                }
            }
        }} />
};

export default AuthMiddleware;