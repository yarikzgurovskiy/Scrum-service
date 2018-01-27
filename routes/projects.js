let express = require('express');
let router = express.Router();

const projects = require('./../controllers/projects');
const middlewares = require('./../modules/middlewares');

router
    .get('/',
    middlewares.requireAuth,
    projects.getAllUserProjects)

    .get('/:id',
    middlewares.requireAuth,
    projects.getProject)

    .post('/',
    middlewares.requireAuth,
    projects.createProject)

    .post('/sprint/:sprintId/update/:itemId',
    middlewares.requireAuth,
    projects.updateItemStatus)

    .post('/:id',
    middlewares.requireAuth,
    projects.updateProject)

    .post('/delete/:id',
    middlewares.requireAuth,
    projects.deleteProject)

    .post('/:id/delete/:itemId',
    middlewares.requireAuth,
    projects.deleteProjectItem)

    .post('/:id/item',
    middlewares.requireAuth,
    projects.createProjectItem)

    .post('/:id/message',
    middlewares.requireAuth,
    projects.newMessage)

    .post('/:id/newSprint',
    middlewares.requireAuth,
    projects.startSprint)

    .post('/:id/addMember',
    middlewares.requireAuth,
    projects.addMemberToProject)

    .post('/:id/:sprintId/complete',
    middlewares.requireAuth,
    projects.completeSprint)



module.exports = router;