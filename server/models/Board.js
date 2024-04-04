import mongoose from 'mongoose';

const BoardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    household: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'household',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task'
    }],
    stats: [{
        catergory: [{
            totalTasks: {
                type: Number,
            },
            subCategories: [{
                name: {
                    type: String,
                },
                totalTasks: {
                    type: Number,
                },
                avgTime: {
                    type: Number,
                },
                fastestTime: {
                    type: Number,
                }
            }]
        }]
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

export const BoardModel = mongoose.model('board', BoardSchema);