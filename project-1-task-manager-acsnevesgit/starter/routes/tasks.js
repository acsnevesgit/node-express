const express = require('express');
const router = express.Router();

// Destructure getAllTasks from Contollers folder
const { getAllTasks, createTask, getTask, updateTask, deleteTask } = require('../controllers/tasks');
// -------*-------*------- NOT NEEDED, JUST FOR LEARNING THE DIFFERENCE PUT/PATCH -------*-------*-------
// const { getAllTasks, createTask, getTask, updateTask, deleteTask, editTask } = require('../controllers/tasks')

// Setup of a getter route where I manually pass my controller
// -> a string of 'all items'
router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);
// -------*-------*------- NOT NEEDED, JUST FOR LEARNING THE DIFFERENCE PUT/PATCH -------*-------*-------
// router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask).put(editTask);

module.exports = router;