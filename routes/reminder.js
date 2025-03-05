const router = require('express').Router();
const reminderController = require('../controllers/reminderController');

// Create a new reminder
router.post('/create', reminderController.createReminder);

// Update a reminder
router.put('/update/:id', reminderController.updateReminder);

module.exports = router;