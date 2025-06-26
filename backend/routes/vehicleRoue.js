const express = require("express");
const router = express.Router();
const vehicleController = require("../controller/vehicleController");

router.post("/create", vehicleController.registerVehicle);
router.get("/", vehicleController.getVehicleByid);

module.exports = router;
