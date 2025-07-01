const Trip = require('../models/trip');
const Vehicles = require('../models/vehicles');
const LocationLog = require('../models/locationLog')
const { publisher } = require('../utils/redis')


exports.onTrip = async (req, res) => {
    const { vehicleId } = req.body;

    try {
        const newTrip = await Trip.create({ vehicleId });

        await Vehicles.findByIdAndUpdate(vehicleId, { onTrip: true })
        return res.status(201).json(newTrip)

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
}

exports.finishTrip = async (req, res) => {
    const { id } = req.params;
    try {
        const trip = await Trip.findByIdAndUpdate(id, {
            endTime: new Date(),
            status: 'finished',
        }, { new: true });

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" })
        }

        await Vehicles.findByIdAndUpdate(trip.vehicleId, { onTrip: false })

        return res.status(200).json({ message: "Trip finished", trip })
    } catch (err) {
        return res.status(500).json({ message: "Cannot finish trip", error: err })
    }
}

exports.logLocation = async (req, res) => {
    const { vehicleId, latitude, longitude, speed } = req.body

    try {
        const currentTrip = await Trip.findOne({ vehicleId, status: 'onTrip' });

        const locationLog = await LocationLog.create({
            vehicleId,
            tripId: currentTrip ? currentTrip._id : null,
            latitude,
            longitude,
            speed
        });

        //trip path
        if (currentTrip) {
            currentTrip.path.push({
                latitude,
                longitude,
                timestamp: new Date()
            });
            await currentTrip.save();
        }

        await Vehicles.findByIdAndUpdate(vehicleId, {
            latitude,
            longitude,
            speed
        })

        if (speed > 90) {
            const vehicle = await Vehicles.findById(vehicleId);
            const alertData = {
                vehicleId,
                licenserPlate: vehicle?.licenserPlate,
                driverName: vehicle?.driverName,
                speed,
                latitude,
                longitude,
                timestamp: new Date()
            };

            await publisher.publish("vehicle:overspeed", JSON.stringify(alertData));
        }
        return res.status(201).json(locationLog)
    } catch (err) {
        return res.status(500).json({ message: "Failed to log location", error: err.message })
    }
}


//getVehicle path
exports.getLocationLog = async (req, res) => {
    const { vehicleId } = req.params;

    try {
        const getLocation = await Trip.findOne({ vehicleId, status: "onTrip" }).populate("path");
        return res.json(getLocation)
    } catch (err) {
        return res.status(500).json({ message: "Failed to get location log" })
    }
}