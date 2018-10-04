require('./config/config.js');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.use(require('./routes/users'));

// Mongoose connection
mongoose.connect(process.env.URLDB, (err) => {
    if (err) {
        throw err;
    }
    console.log('Base de Datos ONLINE');
});
 
app.listen(process.env.PORT, () => {
    console.log('listening http://localhost:3000');
})