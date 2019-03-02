const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gateSchema = Schema({
    gateId: String,
    gsmPhoneNumber : Number,
    gateOpened : Boolean,
    gateLocationLatitude: Number,
    gateLocationLongitude: Number,
    trainApproaching: Boolean
})

module.exports = mongoose.model('Gate', gateSchema)
