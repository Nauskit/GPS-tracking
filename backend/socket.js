const socket = require('socket.io')

let io;

const initSocket = (sever) => {
    io = socket(sever, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST", "PUT"],
        },
    });

    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
}

const getIo = () => {
    if (!io) {
        throw new Error("Socket.io not initialized")
    }
    return io;
}

module.exports = { initSocket, getIo };