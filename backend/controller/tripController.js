const Trip = require('../models/trip');
const Vehicles = require('../models/vehicles');
const LocationLog = require('../models/locationLog')


exports.onTrip = async (req, res) => {
    const { vehicleId } = req.body;

    try {
        const newTrip = await Trip.create({ vehicleId });

        await Vehicles.findByIdAndUpdate(vehicleId, { onTrip: true })
        return res.status(201).json(newTrip)

    } catch (err) {
        return res.status(500).json({ message: "Server Error" });
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
        return res.status(200).json
    } catch (err) {
        return res.status(500).json({ message: "Cannot finish trip", error: err })
    }
}

exports.logLocation = async (req, res) => {
    const { vehicleId, latitude, longitude, speed } = rqe.body

    try {
        const currentTrip = await Trip.findOne({ vehicleId, status: 'onTrip' });

        const locationLog = await LocationLog.create({
            vehicleId,
            tripId: currentTrip ? currentTrip._id : null,
            latitude,
            longitude,
            speed
        })

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
        return res.status(201).json(locationLog)
    } catch (err) {
        return res.status(500).json({ message: "Failed to log location", error: err.message })
    }

}