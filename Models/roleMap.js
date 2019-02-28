const mongoose = require('mongoose')
const Schema = mongoose.Schema
var ObjectId = require('mongoose').Types.ObjectId;

const roleMapSchema = Schema({
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    roleId: {
        type: ObjectId,
        ref: 'Role'
    }
})

module.exports = mongoose.model('RoleMap', roleMapSchema)
