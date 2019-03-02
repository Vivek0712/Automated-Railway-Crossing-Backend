const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gateTrainSensorMapSchema = Schema({
    trainSensorId: {
        type: Schema.Types.ObjectId,
        ref: 'trainSensor'
    },
    gateKitId: {
        type: Schema.Types.ObjectId,
        ref: 'gate'
    },
    stationId: {
        type: Schema.Types.ObjectId,
        ref: 'station'
    },
    isForward: {
        type: Boolean
    }
})

module.exports = mongoose.model('gateTrainSensorMap', gateTrainSensorMapSchema)
