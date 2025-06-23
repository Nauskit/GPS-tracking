const mongoose = require('mongoose');
const vehicles = require('./vehicles');


const locationLogSchema = new mongoose.Schema({

    vehicleId: {
        tpye: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicles',
        required: true
    },
    latitude: {
        type: Number,
        default: null
    },
    longitude: {
        type: Number,
        default: null
    },
    speed: {
        type: Number,
        default: null
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("LocationLog", locationLogSchema);