const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const hasher = require('./../modules/hash');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

let Schema = mongoose.Schema;

let userSchema = new Schema({
    role: {
        type: String,
        required: true,
        enum: ['admin', 'registered'],
        default: "registered"
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        set: pass => hasher.passwordHash(pass)
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar_link: {
        type: String,
        default: "/images/default-profile.png",
        required: true,
    },
    country: {
        type: String,
        required: true,
        default: " "
    },
    city: {
        type: String,
        required: true,
        default: ' '
    },
    facebook: {
        type: String,
        required: true,
        default: ' '
    },
    linkedIn: {
        type: String,
        required: true,
        default: ' '
    },
    github: {
        type: String,
        required: true,
        default: ' '
    },
    telegram: {
        type: String,
        required: true,
        default: ' '
    },
    gender: {
        type: String,
        required: true,
        default: ' '
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    }],
    registration_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    issues: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    }]
});

let User = mongoose.model('User', userSchema);

module.exports.User = User;