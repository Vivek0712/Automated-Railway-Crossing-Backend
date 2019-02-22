const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gateMapSchema = Schema({
    trainSensorPhoneNumber : Number,
    gatePhoneNumber: Number
})