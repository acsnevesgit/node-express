// If we setup an object with all the errors we can have, then we don't have to access them 1-by-1
// Useful package with standard error codes : http-status-codes

const CustomAPIError = require("./custom-error");
const BadRequest = require("./bad-request");
const UnauthenticatedError = require("./unauthenticated");

module.exports = { CustomAPIError, BadRequest, UnauthenticatedError };
