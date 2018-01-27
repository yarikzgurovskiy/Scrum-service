let express = require('express');
let router = express.Router();

const user = require('./../controllers/user');
const middlewares = require('../modules/middlewares');

router
    .get('/all',
    middlewares.requireAuth,
    user.getAllUsers)
    
    .get('/:id',
    middlewares.requireAuth,
    user.getUser)



    .post('/:id',
    middlewares.requireAuth,
    user.updateUser)

module.exports = router;