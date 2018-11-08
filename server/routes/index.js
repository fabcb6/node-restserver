const express = require('express');
const app = express();

app.use(require('./users.js'));
app.use(require('./login.js'));

module.exports = app;
