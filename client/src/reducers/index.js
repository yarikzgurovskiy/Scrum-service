import { combineReducers } from 'redux';

import project from './projectReducer';
import authUser from './authReducer';

const rootReducer = combineReducers({
    project,
    authUser
});

export default rootReducer;