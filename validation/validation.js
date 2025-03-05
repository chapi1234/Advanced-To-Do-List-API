const Joi = require('joi');

// Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data, { abortEarly: false });
};

// Login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data, { abortEarly: false });
};

// Create task validation
const createTaskValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        description: Joi.string().min(5).required(),
        status: Joi.string().valid('pending', 'completed').default('pending'),
        dueDate: Joi.date().optional(),
        userId: Joi.string().required(),
        categoryId: Joi.string()
        // .required()
    });
    return schema.validate(data);
};

// Create category validation
const createCategoryValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        user: Joi.string().required()
    });
    return schema.validate(data);
};

module.exports = {
    registerValidation,
    loginValidation,
    createTaskValidation,
    createCategoryValidation
};