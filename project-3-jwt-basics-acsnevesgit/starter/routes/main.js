// If a token is present in the request
// the user is able to access the info tha belongs to her
// but! with a restricted route if the token is not present or if it
// is not valid then the server will give back the error response

const express = require('express');
const router = express.Router();
const { login, dashboard } = require('../controllers/main');

const authenticationMiddleware = require('../middleware/auth');

// There will eventually be a middleware for authentication as well
// GET route (where we pass the dashboard controller)
router.route('/dashboard').get(authenticationMiddleware, dashboard);
// POST route (where we pass the login controller) because we want to give that user credentials
router.route('/login').post(login); 

module.exports = router;