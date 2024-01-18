// auth/authMiddleware.js
const jwt = require('jsonwebtoken');

const secretKey = '1223'; // Change this to the same secret key used for JWT token generation

exports.authenticateJWT = (req, res, next) => {
    // Extract the token from the request header
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    // Verify the token and extract user information
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden - Invalid token' });
        }

        // Attach user information to the request for further use in the route
        req.user = user;
        next();
    });
};
