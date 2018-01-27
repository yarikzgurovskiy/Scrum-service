const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const image = require('../modules/image');

let User = require('../models/user').User;

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

async function getUser(req, res) {
    let id = req.params.id;
    try {
        let user = await User.findById(mongoose.Types.ObjectId(id)).exec();
        if (user) {
            res.json({ success: true, user });
        } else {
            res.status(404).json({ message: `No user with id ${id}` });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
}

async function updateUser(req, res) {
    let id = req.params.id;
    let userInfo = req.body.userInfo;
    try {
        if (typeof (userInfo.avatar_link) !== 'string') {
            userInfo.avatar_link = await image.loadImage(userInfo.avatar_link.mimetype, userInfo.avatar_link.data, id);
        }
        let user = await User.findByIdAndUpdate(mongoose.Types.ObjectId(id), userInfo, { new: true }).exec();
        if (user) res.json({ success: true, user });
        else res.status(500).json({ message: `Unable to update user ${id}` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getAllUsers(req, res) {
    try {
        let users = await User.find({}).exec();
        
        //divide by pieces
        let limit = parseInt(req.query.limit);
        if (!limit) limit = 5;

        let currentPage = parseInt(req.query.p);
        if (!currentPage) currentPage = 1;

        if (currentPage <= 0) return res.status(400).json({ success: false, message: "Bad request" });

        let pages = Math.ceil(users.length / limit);
        let usersToShow = users.slice((currentPage - 1) * limit, currentPage * limit);

        let response = { limit, pages, count: users.length, users: usersToShow, success: true };
        res.json(response);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ 'message': err.message });
    }
};

module.exports = {
    getUser,
    updateUser,
    getAllUsers
}