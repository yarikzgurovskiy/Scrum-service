let express = require('express');
let router = express.Router();

const auth = require('./../controllers/auth');
const middlewares = require('../modules/middlewares');

router
    .post('/signin',
    middlewares.requireSignIn,
    auth.loginUser)

    .post('/signup',
    auth.registerUser)

module.exports = router;