// Because we don't want to jump everything in app.js it is gonna get messy,
// so we separate controllers and routes

const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    // A bunch of options as below :
    res.status(200).json({ tasks }); // code 200 (when an object is created and returned) -> successful POST request
    // res.status(200).json({ tasks: tasks , amount : tasks.length }); // code 200 (when an object is created and returned) -> successful POST request
    // res.status(200).json({ success : true , data : {tasks, nbHits : tasks.length } }); // code 200 (when an object is created and returned) -> successful POST request
    // res.status(200).json({ status : 'success' , data : {tasks, nbHits : tasks.length } }); // code 200 (when an object is created and returned) -> successful POST request
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task }); // code 201 (when an object is created but only its reference is returned (such as an ID or a link)) -> successful POST request
});

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404));
        // const error = new Error('Not Found'); // Use the Error constructor to create a new error
        // error.status = 404;
        // return next(error); // Use return here so that JS doesn't keep reading the code -> it would reach status(200) down below!
        // return res.status(404).json({ msg: `No task with id : ${taskID}` }); // code 201 (when the server cannot find the requested resource) -> syntax may is correct but the taskID really just does not exist in the DB
    };
    res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404));
        // return res.status(404).json({ msg: `No task with id : ${taskID}` }); // code 201 (when the server cannot find the requested resource) -> syntax may is correct but the taskID really just does not exist in the DB
    };
    res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404));
        // return res.status(404).json({ msg: `No task with id : ${taskID}` }); // code 201 (when the server cannot find the requested resource) -> syntax may is correct but the taskID really just does not exist in the DB
    };
    res.status(200).json({ task });
});

// -------*-------*------- NOT NEEDED, JUST FOR LEARNING THE DIFFERENCE PUT/PATCH -------*-------*-------

// A PUT request (all body properties are replaced only with the property corresponding to the sent value) is slightly different from
// A PATCH request (only the property corresponding to the sent value on the body is replaced, the other properties remain) :
// However!, if we introduce the option 'overwrite: true' on the former the result is the same

// const editTask = async (req, res) => {
//     try {
//         const { id: taskID } = req.params;
//         const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
//             new: true,
//             runValidators: true,
//             overwrite: true,
//         });
//         if (!task) {
//             return res.status(404).json({ msg: `No task with id : ${taskID}` }); // code 201 (when the server cannot find the requested resource) -> syntax may is correct but the taskID really just does not exist in the DB
//         };
//         res.status(200).json({ task });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     };
// };


// Since there will be more functions to export, we'll export each as an argument
module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
// -------*-------*------- NOT NEEDED, JUST FOR LEARNING THE DIFFERENCE PUT/PATCH -------*-------*-------
// module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask, editTask };