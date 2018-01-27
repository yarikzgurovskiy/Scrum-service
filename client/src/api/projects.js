import { apiClient } from './index';

export const getAllProjects = async (filter, limit, page) => {
    return await apiClient('get', `/api/projects?q=${filter}&limit=${limit}&p=${page}`);
};

export const getProject = async (id) => {
    return await apiClient('get', `/api/projects/${id}`);
}

export const createProject = async (userId, newProject) => {
    return await apiClient('post', `/api/projects`, { userId, newProject });
}

export const deleteProject = async (projectId) => {
    return await apiClient('post', `/api/projects/delete/${projectId}`);
}

export const updateProject = async (projectId, projectInfo) => {
    return await apiClient('post', `/api/projects/${projectId}`, { projectInfo });
}

export const deleteProjectItem = async (projectId, itemId) => {
    return await apiClient('post', `/api/projects/${projectId}/delete/${itemId}`);
}

export const createProjectItem = async (projectId, item, authorId) => {
    return await apiClient('post', `/api/projects/${projectId}/item`, { item, authorId });
}

export const updateProjectItem = async (itemId, itemInfo) => {
    return await apiClient('post', `/api/projects/item/${itemId}`, { item: itemInfo });
}

export const changeItemStatus = async (sprintId, itemId, fromStatus, toStatus) => {
    return await apiClient('post', `/api/projects/sprint/${sprintId}/update/${itemId}`, { fromStatus, toStatus });
}

export const sendMessage = async (projectId, text, authorId) => {
    return await apiClient('post', `/api/projects/${projectId}/message`, { text, authorId });
}

export const startSprint = async (projectId, sprint) => {
    return await apiClient('post', `/api/projects/${projectId}/newSprint`, { sprint });
}
export const addMemberToProject = async (projectId, email) => {
    return await apiClient('post', `/api/projects/${projectId}/addMember`, { email });
}

export const completeSprint = async (projectId, sprintId) => {
    return await apiClient('post', `/api/projects/${projectId}/${sprintId}/complete`);
}