// It works but! instead of just using this error class we can extend it
// i. Bad request; 1 error
// ii. Failed authorization : 2 errors, within this class we are going to hardcode them

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
    // this.statusCode = statusCode; -> we passed this to the children classes...
  };
};

module.exports = CustomAPIError;
