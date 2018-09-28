require('../config/config.js');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.get('/usuario', function (req, res) {  // GET: Optener Datos
    res.json('get usuario')
})

app.post('/usuario', function (req, res) {  // POST: Insertar Datos
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        })
    } else {
        res.json({
            persona: body
        })
    }
}) 

app.put('/usuario/:id', function (req, res) {  // PUT: Actualiza Datos igual que PATCH
    let id = req.params.id;
    res.json({
        id
    })
}) 

app.delete('/usuario', function (req, res) {  // DELETE: Borrado logico Datos
    res.json('get usuario')
}) 
 
app.listen(process.env.PORT, () => {
    console.log('listening http://localhost:3000');
})