const mongoose = require('mongoose');


const vehiclesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    licenserPlate: {
        type: String,
        default: null
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Vehicles', vehiclesSchema);