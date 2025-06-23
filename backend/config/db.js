const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected successfully to MongoDB");
    } catch (err) {
        console.log("Error connecting to MongoDB: ", err);
    }
}

module.exports = connectDB;