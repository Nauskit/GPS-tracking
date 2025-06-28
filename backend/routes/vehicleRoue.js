const express = require("express");
const router = express.Router();
const vehicleController = require("../controller/vehicleController");

router.post("/create", vehicleController.registerVehicle);
router.get("/", vehicleController.getVehicleByid);
router.put("/update/:licenserPlate", vehicleController.updateVehicleLocation);
router.get("/getUser", vehicleController.getAllVehicle)

module.exports = router;
