const OTP = require('../model/OTP.schema');
const sendEmail = require('./email.controller');
const { authenticator } = require('otplib');
const bcrypt = require('bcrypt');

// Generate a 6-digit OTP using otplib
const generateOTP = () => authenticator.generate(process.env.TOTP_SECRET);

const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // Generate a random OTP
        const otp = generateOTP();
        console.log("Generated OTP:", otp);

        // Hash the OTP before storing it
        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);

        const message = `
        <h2>Your OTP Code</h2>
        <p>Your One-Time Password (OTP) for login is:
        <b>${otp}</b></p>
        <p>Your OTP is valid for 5 minutes.</p>
        `;

        const emailResponse = await sendEmail({
            to: email,
            subject: "Your OTP for Two-Step Verification",
            message: message
        });

        if (!emailResponse.success) {
            return res.status(500).json({
                error: emailResponse.error
            });
        }

        // Save hashed OTP to database with expiration
        const otpRecord = new OTP({
            email: email,
            otp: hashedOTP,
            expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes from now
        });

        await otpRecord.save();
        console.log("OTP record saved:", otpRecord);

        res.status(200).json({
            message: "OTP sent successfully"
        });
    } catch (err) {
        console.error('Error in sendOTP:', err);
        res.status(500).json({
            error: "Failed to send OTP"
        });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find the latest OTP record for the user
        const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });

        if (!otpRecord) {
            return res.status(400).json({
                error: "OTP not found. Please request a new OTP."
            });
        }

        // Check if OTP has expired
        if (otpRecord.expiresAt < Date.now()) {
            await OTP.deleteOne({ _id: otpRecord._id });  // Clean up expired OTP
            return res.status(400).json({
                error: "OTP has expired. Please request a new OTP."
            });
        }

        // Verify OTP by comparing the hashed OTP with the entered OTP
        const isMatch = await bcrypt.compare(otp, otpRecord.otp);
        if (!isMatch) {
            return res.status(400).json({
                error: "Invalid OTP"
            });
        }

        // OTP is valid; delete it from the database after successful verification
        await OTP.deleteOne({ _id: otpRecord._id });

        res.status(200).json({
            message: "OTP verified successfully"
        });
    } catch (err) {
        res.status(500).json({
            error: "Failed to verify OTP"
        });
    }
};

module.exports = { sendOTP, verifyOTP };
