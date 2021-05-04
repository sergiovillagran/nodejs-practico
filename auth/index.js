const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const SECRET = config.jwt.secret;

function sign (data) {
    return jwt.sign(data, SECRET);
}

function verify (token) {
    return jwt.verify(token, SECRET);
}

const check = {
    own: function (req, owner) {
        const decoded = decodeHeader(req);
        console.log('-----', decoded);
        console.log('-----', owner);
        if (decoded.id !== owner) {
            throw error('Unauthorized user', 401);
        }
    }
}

function getToken (auth) {
    if (!auth) {
        throw new Error('No viene token');
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Token mal formado')
    }

    let token = auth.replace('Bearer ', '');

    return token;
}

function decodeHeader (req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;
    return decoded;
}

module.exports = { 
    sign, 
    check 
}