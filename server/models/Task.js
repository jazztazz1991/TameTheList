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
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'board',
        required: true
    }
});

export const TaskModel = mongoose.model('task', TaskSchema);