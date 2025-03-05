const Task  = require('../models/Task');
const Category = require('../models/Category');
const User = require('../models/User');
const { createTaskValidation } = require('../validation/validation');

exports.createTask = async (req, res) => {

     // Validate the data before creating a task
     const { error } = createTaskValidation(req.body);
     if (error) {
         const errorDetails = error.details.map(detail => detail.message);
         return res.status(400).send(errorDetails);
     }

    try {
        const { title, description, status, dueDate, userId, categoryId} = req.body;

        // Ensure the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Ensure the category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const task = new Task({
            title,
            description,
            status,
            dueDate,
            user: userId,
            category: categoryId
        });

        await task.save();
        const savedTask = await task.save();
        res.send({
            message: "Successfully registered",
            task: savedTask
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('user').populate('category');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('user').populate('category');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { title, description, status, dueDate, categoryId } = req.body;

        // Ensure the category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status, dueDate, category: categoryId },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getTasksByUser = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.params.userId }).populate('category');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getTasksByCategory = async (req, res) => {
    try {
        const tasks = await Task.find({ category: req.params.categoryId }).populate('user');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};