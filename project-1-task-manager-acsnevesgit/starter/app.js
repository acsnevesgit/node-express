// console.log('Task Manager App')

// Express is a web application framework for Node.
// We will install and use Express to build a web server.

const express = require('express');
const app = express();
const tasks = require('./routes/tasks'); // -> Pass tasks into router
const connectDB = require('./db/connect');
require('dotenv').config(); // -> So that I can hide certain variables, in this case the URI to my MongoDB Atlas project
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware, is Express JSON -> to have data in req.body
app.use(express.static('./public')); // where the static values are set
app.use(express.json());

// routes
// app.get('/hello', (req, res) => {
//     res.send('Task Manager App');
// });

// Looking for API V1 tasks
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

// All the routes :
// app.get('/api/v1/tasks') - get all the tasks
// app.post('/api/v1/tasks') - create a new task
// app.get('/api/v1/tasks/:id') - get single task
// app.patch('/api/v1/tasks/:id') - update single task
// app.delete('/api/v1/tasks/:id') - delete single task

// When deploying, we CANNOT hard-core the number of the port (e.g. 3000).
// The port number will have to be any that is available.
const port = process.env.PORT || 3000;
// const port = 3000;

// Also, could be a good idea to check if we are first connected to the DB and only then we spin up the server
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();