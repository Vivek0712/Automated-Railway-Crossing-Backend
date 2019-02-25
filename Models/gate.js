const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gateSchema = Schema({
    gsmPhoneNumber : Number,
    gateNumber : String,
    gateOpened : Boolean,
    gateLocationLatitude: Number,
    gateLocationLongitude: Number,
    lastBeacon: String
})

module.exports = mongoose.model('Gate', gateSchema)
