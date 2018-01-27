const mongoose = require('mongoose');
require('dotenv').config({ path: "../.env" });

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

let Schema = mongoose.Schema;

let projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    name_key: {
        type: String,
        required: true,
        unique: true,
        set: key => key.toUpperCase()
    },
    start_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    lead: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    image_url: {
        type: String,
        default: '/images/default-project.png',
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    description: {
        type: String,
        required: true,
        default: ' '
    },
    issues: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    }],
    item_counter: {
        type: Number,
        required: true,
        default: 0
    },
    sprints: [{
        type: Schema.Types.ObjectId,
        ref: "Sprint",
        required: true
    }],
    chat: [{
        message: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        }
    }]
});

let Project = mongoose.model('Project', projectSchema);

module.exports.Project = Project;