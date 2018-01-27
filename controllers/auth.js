const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken');

let User = require('../models/user').User;

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

function genTokenForUser(user) {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 30
    });
}

async function registerUser(req, res) {
    try {
        let newUser = await User.create(new User(req.body.user));
        res.json({ success: true, message: "Successfully created" });
    } catch (err) {
        res.status(400).json({ success: false, message: 'Not register' });
    }
}

async function loginUser(req, res) {
    console.log(req.user);
    res.json({ token: genTokenForUser(req.user), success: true, user: req.user });
}

module.exports = {
    registerUser,
    loginUser
}