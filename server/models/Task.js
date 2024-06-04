import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    dueDate: {
        type: Date,
    },
    priority: {
        type: String,
        required: true,
        default: 'low'
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'board',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    repeated: {
        type: Boolean,
        required: true,
        default: false
    },
    repeatTime: {
        type: String,
        default: 'daily'
    },
    subtasks: [{
        name: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    }]
});

export const TaskModel = mongoose.model('task', TaskSchema);