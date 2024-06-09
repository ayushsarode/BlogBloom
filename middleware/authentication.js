const { validateToken } = require('../service/auth');

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]; 

        if (!tokenCookieValue) {
            return res.status(401).json({ error: 'No token provided' });
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
            next();
        } catch (error) {
            console.error('Token validation error:', error);
            return res.status(403).json({ error: 'Invalid token' });
        }
    };
}

module.exports = {
    checkForAuthenticationCookie,
}
