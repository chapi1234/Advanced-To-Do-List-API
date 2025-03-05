const Category = require('../models/Category');
const { createCategoryValidation } = require('../validation/validation');

// Create a new category
exports.createCategory = async (req, res) => {
    // Validate the data before creating a category
    const { error } = createCategoryValidation(req.body);
    if (error) {
        const errorDetails = error.details.map(detail => detail.message);
        return res.status(400).send(errorDetails);
    }

    try {
        const { name, user } = req.body; // Use 'user' instead of 'userId'

        const category = new Category({
            name,
            user
        });

        const savedCategory = await category.save();
        res.status(201).json({
            message: "Category successfully created",
            category: savedCategory
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('user');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('user');
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    // Validate the data before updating a category
    // const { error } = createCategoryValidation(req.body);
    // if (error) {
    //     const errorDetails = error.details.map(detail => detail.message);
    //     return res.status(400).json({ message: 'Validation error', errors: errorDetails });
    // }

    try {
        const { name, user } = req.body; // Use 'user' instead of 'userId'

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, user },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({
            message: "Category successfully updated",
            category: category
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};