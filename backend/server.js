const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const verifyToken = require("./middleware/verifyToken");
const vehicleRoute = require("./routes/vehicleRoue");
const locationLogRoute = require("./routes/locationLogRoute");
const tripRoute = require("./routes/tripRoute");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { initSocket } = require('./socket')


app.use(cors());
app.use(bodyParser.json());
connectDB();

initSocket(server)


app.use("/user", authRoute);
app.use("/vehicle", verifyToken, vehicleRoute);
app.use("/locationlog", locationLogRoute);
app.use("/trip", tripRoute);


server.listen(3000, () => {
  console.log("Server running on Port: http://localhost:3000");
});
