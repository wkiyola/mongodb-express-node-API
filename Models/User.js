const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    team: String,
    dayCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Users', UserSchema);