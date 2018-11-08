const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

const app = express();

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User* or Password incorrect'
                }
            })
        }
        if (!bcrypt.compareSync(password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User or Password* incorrect' + password + userDB.password
                }
            })
        }

        // this token expires in 30 days
        let token = jwt.sign({ user: userDB }, process.env.TOKEN_SEED, { expiresIn: process.env.EXPIRATION_DATE});

        return res.json({
            ok: true,
            user: userDB,
            token
        })
    })
});


module.exports = app;