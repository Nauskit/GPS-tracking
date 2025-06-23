const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');
const verifyToken = require('./middleware/verifyToken')
const app = express();


app.use(bodyParser.json());
app.use(cors());
connectDB();


app.use('/user', authRoute);

app.listen(3000, () => {
    console.log("Server running on Port: http://localhost:3000");
})