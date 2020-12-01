const express = require('express');
const expressAsyncHandler = require('express-async-handler');

const router = express.Router();

// Middleware
const { auth } = require('../middleware/auth');

// Models
const User = require('../models/user');

router.post(
    '/register',
    expressAsyncHandler(async (req, res) => {
        const user = new User(req.body);
        const createdUser = await user.save();
        if (createdUser) {
            res.status(201).send({ message: 'User created', user: createdUser });
        } else {
            res.status(500).send({ message: 'Error in creating user' });
        }
    })
);

router.post(
    '/login',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) {
                    return res.json({
                        auth: false,
                        message: 'Wrong passoword',
                        userData: false,
                    });
                }
                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);
                    res.cookie('auth', user.token).json({
                        auth: true,
                        userData: {
                            id: user._id,
                            email: user.email,
                            name: user.name,
                            lastname: user.lastname,
                        },
                    });
                });
            });
        } else {
            res.send({ auth: false, message: 'Auth failed, email not found', userData: false });
        }
    })
);

router.get('/auth', auth, (req, res) => {
    res.json({
        auth: true,
        userData: {
            id: req.user._id,
            email: req.user.email,
            name: req.user.name,
            lastname: req.user.lastname,
        },
    });
});

router.get('/logout', auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.status(200).send('Logging out');
    });
});

module.exports = router;
