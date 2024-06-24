import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    households: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'household',
    }],
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'board',
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task'
    }],
    lastLoggedIn: {
        type: Date,
        default: Date.now
    },
    currentListType: {
        type: String,
        default: 'checkbox'
    }

});

UserSchema.plugin(passportLocalMongoose);

export const UserModel = mongoose.model('users', UserSchema);