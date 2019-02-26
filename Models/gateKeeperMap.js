const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gateKeeperMapSchema = Schema({
    gateId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId
})

module.exports = mongoose.model('GateKeeperMap', gateKeeperMapSchema)
