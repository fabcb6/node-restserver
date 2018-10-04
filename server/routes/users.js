const express = require('express');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();


app.get('/usuario', (req, res) => {  // GET: Optener Datos
    let from = Number(req.query.from);
    from = Number.isInteger(from) ? from : 0;
    let limit = Number(req.query.limit);
    limit = Number.isInteger(limit) ? limit : 5;

    let filterBy = { state: true };

    User.find(filterBy, 'name email role state google img ')
    .skip(from)
    .limit(limit)
    .exec((err, users) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        User.count(filterBy, (err, count) => {
            return res.json({
                ok: true,
                count,
                users
            })
        })
    });
})

app.post('/usuario', (req, res) => {  // POST: Insertar Datos
    let body = req.body;

    let { name, email, password: password1, role } = body;

    let user = new User({
        name, 
        email, 
        password: bcrypt.hashSync(password1, 10), 
        role
    })

    /* THIS NOT WORKS WITH THIS STRUCTURE */
    // let item = { a: 1, b:2,c:3}
    // let { b, ...rest } = item;
    // res.json({
    //     rest
    // })

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            user: userDB
        });
    })
}) 

// https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate 
app.put('/usuario/:id', (req, res) => {  // PUT: Actualiza Datos igual que PATCH
    let id = req.params.id;
    let body = req.body;

    let itemsToUpdate = _.pick(req.body, ['name', 'email', 'img', 'role', 'state'] )

    User.findByIdAndUpdate( id, itemsToUpdate, { new: true }, (err, userDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            user: userDB
        })
    });
}) 

app.delete('/usuario/:id', (req, res) => {  // DELETE: Borrado logico Datos
    let id = req.params.id;

    /*  remove a user in the DB */
    // User.findByIdAndRemove(id, (err, userDeleted) => {
    //     if (err) {
    //         res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }
    //     if (!userDeleted) {
    //         res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: `User not found with ID: ${ id }`
    //             }
    //         })
    //     }
    //     res.json({
    //         ok: true,
    //         user: userDeleted
    //     })
    // })

    /*  Remove user setting the state in false  */
    User.findByIdAndUpdate(id, { state: false }, { new: true }, (err, userDeleted) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }
        if (!userDeleted) {
            res.status(400).json({
                ok: false,
                err: {
                    message: `User not found with ID: ${ id }`
                }
            })
        }

        res.json({
            ok: true,
            user: userDeleted
        })
    })
    


}) 

module.exports = app;

