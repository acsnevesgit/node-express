const asyncWrapper = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch (error) {
            next(error); // with 'next' we pass the error to the next middleware, in our case the default one (500)
        };
    };
};

module.exports = asyncWrapper;