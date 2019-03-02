const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gateKeeperMapSchema = Schema({
    gateId: {
        type:Schema.Types.ObjectId,
        ref: 'Gate'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('GateKeeperMap', gateKeeperMapSchema)
