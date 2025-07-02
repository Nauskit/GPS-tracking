const express = require('express');
const router = express.Router();
const tripController = require('../controller/tripController')


router.post("/start", tripController.onTrip);
router.put("/:id/finish", tripController.finishTrip);
router.post("/log-location", tripController.logLocation)
router.get("/:vehicleId", tripController.getLocationLog)
router.post("/:vehicleId/clear-overspeed", tripController.clearOverspeed)
module.exports = router;