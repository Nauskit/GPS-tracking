const express = require("express");
const route = express.Router();
const vehicleController = require("../controller/vehicleController");

route.post("/create", vehicleController.registerVehicle);
route.get("/", vehicleController.getVehicleByid);

module.exports = route;
