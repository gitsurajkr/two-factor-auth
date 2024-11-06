const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },

    expiresAt: {
        type: Date,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // expires in 5 minutes
    }
})

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;