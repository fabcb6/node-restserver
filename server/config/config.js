// PORT
process.env.PORT = process.env.PORT || 3000;

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Database
let urlDB = process.env.NODE_ENV === 'dev' ?
    'mongodb://localhost:27017/cafe' : 
    process.env.MONGO_URL;
process.env.URLDB = urlDB;
