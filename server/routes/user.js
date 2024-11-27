import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.js'; // Ensure this path is correct
// import firebase from 'firebase/app';  // If using Firebase

const router = express.Router();

// Firebase configuration (uncomment if using Firebase)
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   ...
// };
// firebase.initializeApp(firebaseConfig);

router.post('/sendOTP', (req, res) => {
    const { phoneNumber, recaptchaToken } = req.body;

    const applicationVerifier = new firebase.auth.RecaptchaVerifier(recaptchaToken);

    auth
        .signInWithPhoneNumber(phoneNumber, applicationVerifier)
        .then((verificationId) => {
            res.status(200).send(verificationId);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(error);
        });
});

router.post("/signup", async (req, res) => {
    console.log
    try {
        const existingUser = await User.find({ email: req.body.email });
        if (existingUser.length) return res.status(409).json({ message: "Email already exists" });

        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
        })
        const savedUser = await newUser.save();

        const token = jwt.sign({ email: savedUser.email, _id: savedUser._id }, "MY_SECRET_KEY", { expiresIn: '1h' });
        res.status(200).json({ message: "User Created", user: savedUser, token });
    } catch (error) {
        console.log({ error })
        res.status(500).json({ message: "Something went wrong", error });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ message: "User not found" });

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(401).json({ message: "Auth Failed" });

        const token = jwt.sign({ email: user.email, _id: user._id }, "MY_SECRET_KEY", { expiresIn: '1h' });
        res.status(200).json({ message: "Login Success", token, user });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "Users", user: users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
