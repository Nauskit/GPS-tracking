const express = require('express');
const route = express.Router();
const locationLogController = require('../controller/locationLogController');

route.post('/', locationLogController.systemLocationLog);
route.get('/:vehicleId', locationLogController.getSystemLocationLog);

module.exports = route;