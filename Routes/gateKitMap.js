const express = require('express')
const router = express.Router()
const gateKitMap = require('../Models/gateKitMap')
const httpUtility = require('../Modules/httpUtility')
const station = require('../Models/station')
const stationGateMap = require('../Models/stationGateMap')

console.log('Loaded Route : GateKitMap')

router.post('/create', (req, res) => {
    stationGateMap.find({ gateId: req.body.gateId }).exec((stationGateMapFindError, stationGateMapDocs) => {
        if (stationGateMapFindError) {
            httpUtility.sendResponse(res, true, stationGateMapFindError)
        } else {
            if (stationGateMapDocs.length == 0) {
                httpUtility.sendResponse(res, false, "Gate not Found")
            } else {
                let newGateKitMap = new gateKitMap({
                    trainSensorId: req.body.trainSensorId,
                    gateKitId: req.body.gateKitId,
                    stationId: stationGateMapDocs[0].stationId
                })

                newGateKitMap.save((saveError, saveDocs) => {
                    if (saveError) {
                        httpUtility.sendResponse(res, true, saveError)
                    } else {
                        httpUtility.sendResponse(res, false, "Gate Map Created Successfully!")
                    }
                })
            }
        }
    })
})

router.get('/getGateKitMap/:id', (req, res) => {
    station.find({ stationMaster: req.params.id }).exec((stationFindError, stationFindDocs) => {
        if (stationFindError) {
            httpUtility.sendResponse(res, true, stationFindError)
        } else {
            if (stationFindDocs.length == 0) {
                httpUtility.sendResponse(res, false, "Not Authorized")
            } else {
                gateKitMap.find({stationId: stationFindDocs[0]._id}).exec((gateKitMapFindError, gateKitMapDocs)=>{
                    if(gateKitMapFindError){
                        httpUtility.sendResponse(res, true, gateKitMapFindError)
                    } else {
                        httpUtility.sendResponse(res, false, gateKitMapDocs)
                    }
                })
            }
        }
    })
})

router.post('/delete', (req, res) => {
    gateKitMap.findByIdAndRemove(req.body._id, (gateKitMapRemoveError, gateKitMapRemoveDocs)=>{
        if(gateKitMapRemoveError){
            httpUtility.sendResponse(res, true, gateKitMapRemoveError)
        } else {
            httpUtility.sendResponse(res, false, "Gate Mapping removed!")
        }
    })
})

module.exports = router