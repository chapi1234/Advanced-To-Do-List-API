const Reminder = require('../models/Reminder');
const Task = require('../models/Task');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

// Create a new reminder
exports.createReminder = async (req, res) => {
    try {
        const { taskId, remindAt } = req.body;

        // Ensure the task exists
        const task = await Task.findById(taskId).populate('user');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const reminder = new Reminder({
            task: taskId,
            remindAt
        });

        const savedReminder = await reminder.save();

        // Schedule the reminder
        scheduleReminder(savedReminder, task.user.email, task.title);

        res.status(201).json({
            message: "Reminder successfully created",
            reminder: savedReminder
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a reminder
exports.updateReminder = async (req, res) => {
    try {
        const { remindAt } = req.body;

        const reminder = await Reminder.findByIdAndUpdate(
            req.params.id,
            { remindAt },
            { new: true }
        );

        if (!reminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

        // Reschedule the reminder
        const task = await Task.findById(reminder.task).populate('user');
        scheduleReminder(reminder, task.user.email, task.title);

        res.status(200).json({
            message: "Reminder successfully updated",
            reminder: reminder
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to schedule a reminder
const scheduleReminder = (reminder, userEmail, taskTitle) => {
    const remindAt = new Date(reminder.remindAt);
    const cronTime = `${remindAt.getMinutes()} ${remindAt.getHours()} ${remindAt.getDate()} ${remindAt.getMonth() + 1} *`;

    cron.schedule(cronTime, () => {
        sendReminderEmail(userEmail, taskTitle);
    });
};

// Function to send reminder email
const sendReminderEmail = (userEmail, taskTitle) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Task Reminder',
        text: `This is a reminder for your task: ${taskTitle}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

// Function to schedule an email based on dueDate
const scheduleDueDateReminder = (task) => {
    const dueDate = new Date(task.dueDate);
    const cronTime = `${dueDate.getMinutes()} ${dueDate.getHours()} ${dueDate.getDate()} ${dueDate.getMonth() + 1} *`;

    cron.schedule(cronTime, () => {
        sendDueDateEmail(task.user.email, task.title);
    });
};

// Function to send due date email
const sendDueDateEmail = (userEmail, taskTitle) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Task Due Date Reminder',
        text: `This is a reminder that your task "${taskTitle}" is due now.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

// Schedule due date reminders for all tasks on server start
const scheduleAllDueDateReminders = async () => {
    const tasks = await Task.find().populate('user');
    tasks.forEach(task => {
        scheduleDueDateReminder(task);
    });
};

// Call this function when the server starts
scheduleAllDueDateReminders();