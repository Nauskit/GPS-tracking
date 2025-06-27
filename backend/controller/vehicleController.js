const Vehicles = require("../models/vehicles");

exports.registerVehicle = async (req, res) => {
  const { driverName, licenserPlate, carType } = req.body;
  const userId = req.user.id;
  if (!driverName || !licenserPlate) {
    return res
      .status(400)
      .json({ message: "Driver-name and licenser-plate must fill" });
  }

  const existing = await Vehicles.findOne({ licenserPlate });
  if (existing) {
    return res
      .status(401)
      .json({ message: "This license plate is already registered" });
  }
  try {
    const createVehicle = await Vehicles.create({
      userId,
      driverName,
      licenserPlate,
      carType,
    });

    return res.status(200).json({ message: "Register vehicle successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error: ", err });
  }
};

exports.getVehicleByid = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({ message: "User not found" });
  }

  try {
    const findVehicleId = await Vehicles.find({ userId })
      .populate("driverName", "licenserPlate")
      .populate("userId", "username");
    return res.status(200).json({ findVehicleId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error: ", err });
  }
};

exports.updateVehicleLocation = async (req, res) => {
  const { licenserPlate } = req.params;
  const { latitude, longitude } = req.body;

  try {
    const vehicle = await Vehicles.findOne({ licenserPlate });
    if (!vehicle) {
      return res.status(404).json({ message: "vehicle not found!" });
    }

    vehicle.latitude = latitude;
    vehicle.longitude = longitude;
    await vehicle.save();

    return res.status(200).json({ message: "vehicle location update" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
