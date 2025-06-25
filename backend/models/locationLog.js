const mongoose = require('mongoose');


const locationLogSchema = new mongoose.Schema({

    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicles',
        required: true
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    speed: {
        type: Number,
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("LocationLog", locationLogSchema);