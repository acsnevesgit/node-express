const mongoose = require('mongoose');

// To set a structure for all the documents in this collection
// e.g. only two field types, one for a string and another for a boolean.
// Only the 'name' and 'completed' properties will be passed into the DB, other no mentioned in this schema will NOT!
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxlength: [26, 'name cannot be more than 26 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// Validation -> Since we don't want to pass in empty properties or have empty spaces around the string, etc

// Now the model for this collection, API to the DB
// Now in the controllers we can start using this model
module.exports = mongoose.model('Task', TaskSchema);
