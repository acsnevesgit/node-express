// In the middleware, decide which routes need to be authenticated
// 'next' (to move to the next middleware, e.g. dashboard) is very important to make sure that the cycle does not break

const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
    // console.log(req.headers.authorization);
    // console.log(req.headers);
    const authHeader = req.headers.authorization;

    // If it there is no authorization header or if it does not start with bearer, we throw the custom error
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided'); // 401 -> not a bad request (400) but an authentication error
    };

    const token = authHeader.split(' ')[1];
    // console.log(token);

    try {
        // decoded will return id, username, iat (issued at), exp.
        // All this coming from the payload we passed when we signed the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username } = decoded;
        req.user = { id, username };
        next();
        // console.log(decoded);
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route'); // e.g. token could be expired
    };
};

module.exports = authenticationMiddleware;

