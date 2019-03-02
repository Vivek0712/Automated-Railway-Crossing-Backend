const express = require('express')
const router = express.Router()
const httpUtility = require('../Modules/httpUtility')
const gateKeeperMap = require('../Models/gateKeeperMap')
console.log('Loaded Route : GateKeeperMap')

router.post('/create',(req, res)=>{
    let newGateKeeperMap = new gateKeeperMap({
        userId : req.body.userId,
        gateId: req.body.gateId
    })

    newGateKeeperMap.save((saveError, saveDocs)=>{
        if(saveError){
            httpUtility.sendResponse(res, true, saveError)
        } else {
            httpUtility.sendResponse(res, false, 'New GateKeeper Mapping Created')
        }
    })
})

router.get('/getGate/:gateKeeperId', (req, res)=>{
    console.log(req.params.gateKeeperId)
    gateKeeperMap.find({userId : req.params.gateKeeperId}).populate('gateId').exec((findError, findDocs)=>{
        if(findError){
            httpUtility.sendResponse(res, true, findError)
        } else {
            if(findDocs.length == 0 ){
                httpUtility.sendResponse(res, false, 'Not Authorized')
            } else {
                httpUtility.sendResponse(res, false, findDocs)
            }
        }
    })
})

router.post('/delete', (req, res)=>{
    
})

module.exports = router