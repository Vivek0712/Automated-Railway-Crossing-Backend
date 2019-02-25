const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stationSchema = Schema({
    stationCode: String,
    stationMaster: Schema.Types.ObjectId
})

module.exports = mongoose.model('Station', stationSchema)