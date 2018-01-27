import * as types from './actionTypes';
import * as apiProjects from '../api/projects';
import { loadAuthUser } from './userActions';
import { emitProjectChanged } from '../api/socket';

export const loadProjectSuccess = (project) => {
    return { type: types.LOAD_PROJECT_SUCCESS, project };
}

export const loadProject = (id) => {
    return dispatch => {
        return apiProjects.getProject(id)
            .then(response => dispatch(loadProjectSuccess(response.project)))
            .catch(err => { throw err; })
    }
}

export const updateProject = (id, projectInfo) => {
    return dispatch => {
        return apiProjects.updateProject(id, projectInfo)
            //.then(() => dispatch(loadProject(id)))
            .then(() => {
                emitProjectChanged();
            })
            .catch(err => { throw err; })
    }
}

export const createItem = (id, item, authorId) => {
    return dispatch => {
        return apiProjects.createProjectItem(id, item, authorId)
            //.then(() => dispatch(loadProject(id)))
            .then(() => {
                emitProjectChanged();
            })
            .catch(err => { throw err; });
    }
}

export const updateItem = (id, item, projectId) => {
    return dispatch => {
        return apiProjects.updateProjectItem(id, item)
            .then(() => dispatch(loadProject(projectId)))
            .catch(err => { throw err; });
    }
}

export const changeItemStatus = (projectId, sprintId, itemId, fromStatus, toStatus) => {
    return dispatch => {
        return apiProjects.changeItemStatus(sprintId, itemId, fromStatus, toStatus)
            //.then(() => dispatch(loadProject(projectId)))
            .then(() => {
                emitProjectChanged(itemId);
            })
            .catch(err => { throw err; });
    }
}

export const deleteItem = (itemId, projectId) => {
    return dispatch => {
        return apiProjects.deleteProjectItem(projectId, itemId)
            //.then(() => dispatch(loadProject(projectId)))
            .then(() => {
                emitProjectChanged(itemId);
            })
            .catch(err => { throw err });
    }
}

export const deleteProject = (userId, id) => {
    return dispatch => {
        return apiProjects.deleteProject(id)
            .then(() => {
                dispatch(loadAuthUser(userId));
            })
            .catch(err => { throw err; });
    }
}

export const createProject = (userId, project) => {
    return function (dispatch) {
        return apiProjects.createProject(userId, project)
            .then(() => {
                dispatch(loadAuthUser(userId));
            })
            .catch(err => { throw err; });
    }
}

export const sendMessage = (projectId, message, authorId) => {
    return () => {
        return apiProjects.sendMessage(projectId, message, authorId)
            .then(() => {
                emitProjectChanged();
            })
            .catch(err => { throw err });
    }
}

export const startSprint = (projectId, sprint) => {
    return () => {
        return apiProjects.startSprint(projectId, sprint)
            .then(() => {
                emitProjectChanged();
            })
            .catch(err => { throw err });
    }
}

export const completeSprint = (projectId, sprintId) => {
    return () => {
        return apiProjects.completeSprint(projectId, sprintId)
            .then(() => {
                emitProjectChanged();
            })
            .catch(err => { throw err; });
    }
}

export const addMember = (projectId, email) => {
    return () => {
        return apiProjects.addMemberToProject(projectId, email)
            .then(() => {
                emitProjectChanged();
            })
            .catch(err => { throw err; });
    }
}
