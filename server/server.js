require('./config/config.js');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
// gloval rountes index
app.use(require('./routes/index'));

// web public folder
app.use(express.static(path.resolve(__dirname, '../public')));

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