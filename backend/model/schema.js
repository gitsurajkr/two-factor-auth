const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema);

module.exports = User;