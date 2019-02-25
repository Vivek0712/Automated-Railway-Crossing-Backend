const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stationGateMapSchema = Schema({
    stationId: Schema.Types.ObjectId,
    gateId: Schema.Types.ObjectId
})

module.exports = mongoose.model('StationGateMap', stationGateMapSchema)