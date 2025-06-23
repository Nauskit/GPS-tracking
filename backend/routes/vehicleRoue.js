const express = require("express");
const route = express.Router();
const vehicleController = require("../controller/vehicleController");

route.post("/", vehicleController.registerVehicle);
route.get("/", vehicleController.getVehicleByid);

module.exports = route;
