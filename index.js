const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Load config  
dotenv.config({ path: './config/config.env' });

const MONGODB = process.env.MONGODB
const PORT = process.env.PORT || 3000;
const app = express();

//  Importing routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const categoryRoutes = require('./routes/category');
const userRoutes = require('./routes/user');
const reminderRoutes = require('./routes/reminder');

// middleware 
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//  Route middleware
app.use('/api/user', authRoutes);
app.use('/api/task', taskRoutes)
app.use('/api/category', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reminder', reminderRoutes);

// Connect to MongoDB
mongoose.connect(MONGODB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error: ', err));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
