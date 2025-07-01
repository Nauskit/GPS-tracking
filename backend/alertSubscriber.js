const { subscriber } = require('./utils/redis');
const { getIo } = require('./socket');

const listenOverspeedAlert = () => {
    subscriber.subscribe("vehicle:overspeed", () => {
        console.log("Subscribed to overspeed-alert");
    });
    subscriber.on("message", (channel, message) => {
        if (channel === "vehicle:overspeed") {
            const alert = JSON.parse(message);
            console.log("Overspeed Detected: ", alert);

            const io = getIo();
            io.emit("overspeed", alert)
        }
    })
}

module.exports = listenOverspeedAlert