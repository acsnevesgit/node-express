const mongoose = require('mongoose');

// const connectionString = '';


// The .connect can take optional arguments, for e.g. to we don't get deprecation warnings
// e.g. "DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version."

const connectDB = (url) => {
    return mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true });
};


module.exports = connectDB;

// mongoose.connect(connectionString, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true }).then(() => console.log('CONNECTED TO THE DB...')).catch((err) => console.log(err));