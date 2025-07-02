const LocationLog = require("../models/locationLog");

exports.systemLocationLog = async (req, res) => {
  const { vehicleId, latitude, longitude, speed } = req.body;

  try {
    const newLog = new LocationLog({
      vehicleId,
      latitude,
      longitude,
      speed,
    });

    const saveLog = await newLog.save();
    return res.status(201).json(saveLog);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getSystemLocationLog = async (req, res) => {
  const vehicleId = req.params.id;

  if (!vehicleId) {
    return res.status(401).json({ message: "Not have vegicleId" });
  }
  try {
    const logs = await LocationLog.find({ vehicleId }).sort({ createAt: -1 });

    return res.status(200).json(logs);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
