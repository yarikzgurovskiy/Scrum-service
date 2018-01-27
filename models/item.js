const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

let Schema = mongoose.Schema;

let itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    name_key: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['story', 'task'],
        required: true
    },
    story_points: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['do', 'done', 'inprogress'],
        required: true,
        default: 'do'
    },
    description: {
        type: String,
        required: true,
        default: ' '
    },
    priority: {
        type: Number,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    performers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

let Item = mongoose.model('Item', itemSchema);

module.exports.Item = Item;