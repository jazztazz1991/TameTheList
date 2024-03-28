import mongoose from 'mongoose';

const HouseholdSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }],
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'board',
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

export const HouseholdModel = mongoose.model('household', HouseholdSchema);