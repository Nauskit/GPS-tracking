const mongoose = require("mongoose");

const locationLogSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicles",
      required: true,
    },
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      default: null,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    speed: {
      type: Number,
    },
  },
  { timestamps: true }
);

locationLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 })
module.exports = mongoose.model("LocationLog", locationLogSchema);
