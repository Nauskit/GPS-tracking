const Vehicles = require("../models/vehicles");
const { getIo } = require("../socket");
const redisClient = require("../config/redisCache");

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

    await redisClient.del(`vehicle:${userId}`);

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
    const cacheKey = `vehicle:${userId}`;
    const cacheData = await redisClient.get(cacheKey);

    if (cacheData) {
      console.log("Cache hit");
      return res.status(200).json(JSON.parse(cacheData));
    }

    const findVehicleId = await Vehicles.find({ userId }).populate(
      "userId",
      "username"
    );
    if (!findVehicleId) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    await redisClient.set(
      cacheKey,
      JSON.stringify({ findVehicleId }),
      "EX",
      3600
    );

    console.log("Save to redis");

    return res.status(200).json({ findVehicleId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error: ", err });
  }
};

exports.getAllVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicles.find().sort({ createAt: -1 });
    return res.status(200).json(vehicle);
  } catch (err) {
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

    //clear cache when update data
    await redisClient.del(`vehicle:${vehicle.userId}`);

    const io = getIo();
    io.emit("locationUpdate", {
      licenserPlate,
      latitude,
      longitude,
      speed: vehicle.speed,
      onTrip: vehicle.onTrip,
    });

    return res.status(200).json({ message: "vehicle location update" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
