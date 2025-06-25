const mongoose = require("mongoose");

const vehiclesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  licenserPlate: {
    type: String,
    default: null,
  },
  carType: {
    type: String,
    default: null
  },
  latitude: {
    type: Number,
    default: '13.7563'
  },
  longitude: {
    type: Number,
    default: '100.5018'
  },
  speed: {
    type: Number,
    default: null
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Vehicles", vehiclesSchema);
