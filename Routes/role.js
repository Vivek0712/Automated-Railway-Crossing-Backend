const express = require('express')
const router = express.Router()
const role = require('../Models/role')
const httpUtility = require('../Modules/httpUtility')
const roleMap = require('../Models/roleMap')

console.log('Loaded Route : Role')

router.post('/create', (req, res)=>{
    let newRole = new role({
        name: req.body.name
    })

    newRole.save((saveError, saveDocs)=>{
        if(saveError){
            httpUtility.sendResponse(res, true, saveError)
        } else {
            httpUtility.sendResponse(res, false, "Role Created Successfully")
        }
    })
})

router.get('/getRoles',(req, res)=>{
    role.find({}).exec((roleFindError, roleDocs)=>{
        if(roleFindError){
            httpUtility.sendResponse(res, true, roleFindError)
        } else {
            httpUtility.sendResponse(res, false, roleDocs)
        }
    })
})

router.get('/delete', (req, res)=>{
    roleMap.remove({role_id: req.body._id}).exec((roleMapRemoveError, roleMapRemoveDocs)=>{
        if(roleMapRemoveError){
            httpUtility.sendResponse(res, true, roleMapRemoveError)
        } else {
            role.findByIdAndRemove(req.body._id,(roleError, roleRemoveDocs)=>{
                if(roleError){
                    httpUtility.sendResponse(res, true, roleError)
                } else {
                    httpUtility.sendResponse(res, false, "Role Removed Successfully")
                }
            })
        }
    })
})


module.exports = router