const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const verifyToken = require("./middleware/verifyToken");
const vehicleRoute = require("./routes/vehicleRoue");
const locationLogRoute = require("./routes/locationLogRoute");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

app.use(cors());
app.use(bodyParser.json());
connectDB();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use("/user", authRoute);
app.use("/vehicle", verifyToken, vehicleRoute);
app.use("/locationlog", locationLogRoute);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on Port: http://localhost:3000");
});
