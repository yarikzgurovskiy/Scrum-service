import { apiClient } from './index';

export const createUser = async (user) => {
    return await apiClient('post', '/api/auth/signup', { user });
};

export const loginUser = async (user) => {
    return await apiClient('post', '/api/auth/signin', user);
}

export const getUser = async (userId) => {
    return await apiClient('get', `/api/user/${userId}`);
}

export const updateUser = async (userId, userInfo) => {
    return await apiClient('post', `/api/user/${userId}`, { userInfo });
}

export const getAllUsers = async (limit, page) => {
    return await apiClient('get', `/api/user/all?limit=${limit}&p=${page}`);
};