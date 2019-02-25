const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stationSchema = Schema({
    gsmPhoneNumber : Number,
    gateNumber : String,
    gateState : Number
})

module.exports = mongoose.model('Station', stationSchema)