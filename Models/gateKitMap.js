const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gateTrainSensorMapSchema = Schema({
    trainSensorId: Schema.Types.ObjectId,
    gateKitId: Schema.Types.ObjectId,
    stationId: Schema.Types.ObjectId
})

module.exports = mongoose.model('gateTrainSensorMap', gateTrainSensorMapSchema)
