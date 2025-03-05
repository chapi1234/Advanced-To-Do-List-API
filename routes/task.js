const router = require('express').Router();
const taskController = require('../controllers/taskController');

// Create a new task
router.post('/create', taskController.createTask);

// Get all tasks
router.get('/', taskController.getAllTasks);

// Get a task by ID
router.get('/:id', taskController.getTaskById);

// Update a task
router.put('/:id', taskController.updateTask);

// Delete a task
router.delete('/:id', taskController.deleteTask);

// Get tasks by user
router.get('/user/:userId', taskController.getTasksByUser);

// Get tasks by category
router.get('/category/:categoryId', taskController.getTasksByCategory);

module.exports = router;