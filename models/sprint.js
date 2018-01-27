const mongoose = require('mongoose');
require('dotenv').config({ path: "../.env" });

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

let Schema = mongoose.Schema;

let sprintSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    finish_date: {
        type: Date,
        required: true
    },
    issues: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    }],
    execution: [{
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
        story_points: {
            type: Number,
            required: true
        }
    }],
    estimate: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
});

let Sprint = mongoose.model('Sprint', sprintSchema);

module.exports.Sprint = Sprint;