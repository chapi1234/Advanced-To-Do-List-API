const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, password },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: "User successfully updated",
            user: user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};