// PORT
process.env.PORT = process.env.PORT || 3000;

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Database
let urlDB = process.env.NODE_ENV === 'dev' ?
    'mongodb://localhost:27017/cafe' : 
    'mongodb://cafe-user:C473User!@ds121753.mlab.com:21753/cafe';
process.env.URLDB = urlDB;
