const express = require('express')
const router = express.Router()
const httpUtility = require('../Modules/httpUtility')
const roleMap = require('../Models/roleMap')

console.log('Loaded Route : RoleMap')

router.post('/create', (req, res)=>{
    let newRoleMap = new roleMap({
        userId: req.body.userId,
        roleId: req.body.roleId
    })

    newRoleMap.save((saveError, saveDocs)=>{
        if(saveError){
            httpUtility.sendResponse(res, true, saveError)
        } else {
            httpUtility.sendResponse(res, false, "Role Mapped Successfully")
        }
    })
})

router.get('/getRoleMaps',(req, res)=>{
    roleMap.find({}).populate('userId').populate('roleId').exec((roleMapFindError, roleMapDocs)=>{
        if(roleFindError){
            httpUtility.sendResponse(res, true, roleMapFindError)
        } else {
            httpUtility.sendResponse(res, false, roleMapDocs)
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