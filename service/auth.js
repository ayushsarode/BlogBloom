const JWT  = require('jsonwebtoken')
require('dotenv').config();

const secret = process.env.SECRET_KEY;


function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };
    
    // Optionally, add an expiration time (e.g., 1 hour)
    const token = JWT.sign(payload, secret, { expiresIn: '1h' });
    
    return token;
}

// Validate a token and return the payload
function validateToken(token) {
    try {
        const payload = JWT.verify(token, secret);
        return payload;
    } catch (error) {
        // Handle token verification errors
        console.error('Token validation error:', error);
        throw new Error('Invalid token');
    }
}

module.exports = {
    createTokenForUser,
    validateToken,
};

module.exports = {
    createTokenForUser,
    validateToken
}