const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load config  
dotenv.config({ path: './config/config.env' });

const MONGODB = process.env.MONGODB
const PORT = process.env.PORT || 3000;
const app = express();


// middleware 
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error: ', err));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
