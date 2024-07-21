const jwt = require('jsonwebtoken')
const {secretKey} = require('../config/jwtConfig')

function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        userName: user.userName,
        role: user.role
    }
    return jwt.sign(payload, secretKey, {expiresIn: "1h"});
};

module.exports = {
    generateToken
}