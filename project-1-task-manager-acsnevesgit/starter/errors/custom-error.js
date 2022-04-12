class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message) // Invokes method from the parent class
        this.statusCode = statusCode; // Kind of -> for this 'statusCode' give me the corresponding 'message'
    };
};

const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode);
};

module.exports = { createCustomError, CustomAPIError };