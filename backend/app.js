const express = require("express");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const verifyToken = require("./middleware/verifyToken");
const vehicleRoute = require("./routes/vehicleRoue");
const locationLogRoute = require("./routes/locationLogRoute");
const tripRoute = require("./routes/tripRoute");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
connectDB();

app.use("/user", authRoute);
app.use("/vehicle", verifyToken, vehicleRoute);
app.use("/locationlog", locationLogRoute);
app.use("/trip", tripRoute);

module.exports = app;
