const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stationTrainSensorMap = Schema({
    stationId: Schema.Types.ObjectId,
    trainSensorId: Schema.Types.ObjectId
})

module.exports = mongoose.model('StationTrainSensorMap', stationTrainSensorMap)