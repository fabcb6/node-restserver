// PORT
process.env.PORT = process.env.PORT || 3000;

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Token Expiration
// 60 sec 60 min 24 hours 30 days
process.env.EXPIRATION_DATE = 60 * 60 * 24 * 30;

// Token SEED
process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'this-is-a-secret-word';

// Database
let urlDB = process.env.NODE_ENV === 'dev' ?
    'mongodb://localhost:27017/cafe' : 
    process.env.MONGO_URL;
process.env.URLDB = urlDB;

// Google CLIENT_ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '595539727321-76bgmv6v349eur7i6kskdhrhbutmth4p.apps.googleusercontent.com';

