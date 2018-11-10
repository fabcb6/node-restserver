const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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
        let token = jwt.sign(
            { user: userDB }, 
            process.env.TOKEN_SEED, 
            { expiresIn: process.env.EXPIRATION_DATE}
        );

        return res.json({
            ok: true,
            user: userDB,
            token
        })
    })
});

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  
    });
    const payload = ticket.getPayload();
    // const userid = payload['sub'];

    let { name, email, picture:img } = payload;

    return {
        name, 
        email, 
        img,
        google: true
    };
  }

app.post('/google', async(req, res) => {
    let token = req.body.idtoken;

    
    let googleUser = await verify(token)
    .catch(err => {
        return res.status(403).json({
            ok: false,
            err
        });
    })

    User.findOne({ email: googleUser.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (userDB) {
            if (!userDB.google) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'This email is already register with a password method.'
                    }
                });
            } else {
                let token = jwt.sign(
                    { user: userDB }, 
                    process.env.TOKEN_SEED, 
                    { expiresIn: process.env.EXPIRATION_DATE}
                );

                return res.json({
                    ok: true,
                    user: userDB,
                    token
                })
            }
        } else {
            let newUser = new User();
            // newUser = { ...googleUser };
            newUser.name = googleUser.name;
            newUser.email = googleUser.email;
            newUser.img = googleUser.img;
            newUser.google = googleUser.google;
            newUser.password = "123456";

            newUser.save((err, userDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                let token = jwt.sign(
                    { user: userDB }, 
                    process.env.TOKEN_SEED, 
                    { expiresIn: process.env.EXPIRATION_DATE}
                );

                return res.json({
                    ok: true,
                    user: userDB,
                    token
                });
            });
        }
    });
});


module.exports = app;