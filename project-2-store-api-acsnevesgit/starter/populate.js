// We will invoke populate.js to dinamically set all the products (products.json) into the DB

require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');
const jsonProducts = require('./products.json');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        // Just to make sure, we can delete Whatever was already in the DB before adding the new objects
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log('Success!'); // To see if we were able to connect to the DB
        process.exit(0);
    } catch (error) {
        console.log(error); // To see if we failed to connect to the DB
        process.exit(1);
    };
};

// Using create() we can pass a 'product' object
// In this case we will pass an array of objects (products.json)
// Then we can start using the filter

start();