const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicles',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ['onTrip', 'finished'],
        default: 'onTrip'
    },
    path: [{
        latitude: Number,
        longitude: Number,
        timestamp: Date
    }]
})

module.exports = mongoose.model("Trip", tripSchema)