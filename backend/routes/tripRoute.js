const express = require('express');
const router = express.Router();
const tripController = require('../controller/tripController')


router.post("/start", tripController.onTrip);
router.put("/:id/finish", tripController.finishTrip);
router.post("/log-location", tripController.logLocation)
router.get("/:vehicleId", tripController.getLocationLog)

module.exports = router;