import express from 'express';
import mongoose from 'mongoose';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Import models
import Passwords from '../models/passwords.js';
import User from '../models/users.js';

const router = express.Router();

function sendResetEmail(email, resetToken) {
    console.log("email", email, resetToken);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'amanchoudhary0109@gmail.com', // replace with your email
            pass: 'jycc ibly qces deds' // replace with your email password or app-specific password
        }
    });

    const mailOptions = {
        from: 'amanchoudhary0109@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: http://localhost:5173/${resetToken}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

router.post('/forgot_password', (req, res, next) => {
    const email = req.body.email;
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const resetToken = crypto.randomBytes(20).toString('hex');
            const passwordReset = new Passwords({
                user: user._id,
                resetToken: resetToken,
                resetTokenExpiration: Date.now() + 3600000 // 1 hour
            });
            return passwordReset.save();
        })
        .then((result) => {
            if (result) {
                sendResetEmail(email, result.resetToken);
                res.status(200).json({ message: "Password reset link sent successfully" });
            }
        })
        .catch((e) => res.status(500).json({ message: e.message }));
});

router.post('/validateToken', (req, res, next) => {
    const token = req.body.token;
    Passwords.findOne({ resetToken: token })
        .then((password) => {
            if (password) {
                res.status(200).json({ message: "Valid token" });
            } else {
                res.status(400).json({ message: 'Invalid or expired token' });
            }
        })
        .catch((e) => res.status(500).json({ message: e.message }));
});

router.post('/reset_password', (req, res, next) => {
    const token = req.body.token;
    const newPassword = req.body.password;

    Passwords.findOne({ resetToken: token })
        .then((passwordDoc) => {
            if (!passwordDoc) {
                return res.status(404).json({ message: 'Invalid or expired token' });
            }
            return User.findById(passwordDoc.user);
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            user.password = newPassword; // Assume the password hashing logic is handled elsewhere
            return user.save();
        })
        .then(() => res.status(200).json({ message: 'Password reset successful' }))
        .catch((error) => res.status(500).json({ message: error.message }));
});

export default router;
