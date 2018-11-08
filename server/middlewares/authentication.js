const jwt = require('jsonwebtoken');

// Validate the incomming token
let validateToken = (req, res, next) => {
    let token = req.get('token'); //get the token from the headers

    jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Invalid Token.'
                }
            })
        }

        req.user = decoded.user;
        next();
    })
};

// Validate the Admin_Role
let validateAdminRole = (req, res, next) => {
    let user = req.user;

    if (user.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'You must to be an Administrator'
            }
        })
    }

    next();
}

module.exports = {
    validateToken,
    validateAdminRole
};
