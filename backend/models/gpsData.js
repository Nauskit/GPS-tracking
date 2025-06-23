const mongoose = require('mongoose');


const gpsDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    latitude: {
        type: Number,
        required: true,
        default: null
    },
    longitude: {
        type: Number,
        required: true,
        default: null
    }
})

module.exports = mongoose.model('GpsData', gpsDataSchema);