const LocationLog = require('../models/locationLog')

exports.systemLocationLog = async (req, res) => {
    const { vehicleId, latitude, longitude, speed } = req.body;

    try {
        const newLog = new LocationLog({
            vehicleId,
            latitude,
            longitude,
            speed
        });

        const saveLog = await newLog.save();
        return res.status(201).json(saveLog)
    } catch (err) {
        return res.status(500).json({ message: "Server error" })
    }
}


exports.getSystemLocationLog = async (req, res) => {
    const { vehicleId } = req.params;
    try {
        const logs = await LocationLog.findOne({ vehicleId }).sort({ timestamp: -1 });

        res.json(logs)
    } catch (err) {
        return res.status(500).json({ message: "Server error" })
    }

}