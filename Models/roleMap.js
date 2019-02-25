const mongoose = require('mongoose')
const Schema = mongoose.Schema
var ObjectId = require('mongoose').Types.ObjectId;

const roleMapSchema = Schema({
    userId: ObjectId,
    roleId: ObjectId
})

module.exports = mongoose.model('RoleMap', roleMapSchema)
