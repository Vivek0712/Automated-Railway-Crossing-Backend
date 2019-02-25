const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gateSchema = Schema({
    gsmPhoneNumber : Number,
    gateNumber : String,
    gateState : Number
})

module.exports = mongoose.model('Gate', gateSchema)
