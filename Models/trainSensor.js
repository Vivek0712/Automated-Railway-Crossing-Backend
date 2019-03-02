const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trainSensorSchema = Schema({
    gsmPhoneNumber : Number,
    locationLongitude: Number,
    locationLatitude: Number,
    isSensed: Boolean,
    lastBeacon: String,
    stationId: String
})

module.exports = mongoose.model('TrainSensor', trainSensorSchema)