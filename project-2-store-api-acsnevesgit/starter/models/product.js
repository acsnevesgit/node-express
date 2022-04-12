const mongoose = require('mongoose');

// Product Schema -> structure for the poduct

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name must be provided'],
    },
    price: {
        type: Number,
        required: [true, 'product price must be provided'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    company: {
        type: String,
        // 4 values but could be more or less companies
        // We can add the products dinamically instead of 1-by-1
        // enum: ['ikea', 'liddy', 'caressa', 'marcos']¨,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported',
        },
    },
});

// Export model called Product with productSchema
module.exports = mongoose.model('Product', productSchema);