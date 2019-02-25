const express = require('express')
const router = express.Router()
const gate = require('../Models/gate')
const gateKitMap = require('../Models/gateKitMap')
const station = require('../Models/station')
const serialPort = require('../Modules/serialPort')
const httpUtility = require('../Modules/httpUtility')
const stationGateMap = require('../Models/stationGateMap')

console.log('Loaded Route : Gate')

router.post('/create', (req, res) => {
    let newGate = new gate({
        gsmPhoneNumber: req.body.gsmPhoneNumber,
        gateNumber: req.body.gateNumber,
        gateOpened: true,
        gateLocationLatitude: req.body.gateLocationLatitude,
        gateLocationLongitude: req.body.gateLocationLongitude,
        lastBeacon: req.body.lastBeacon
    })

    newGate.save((saveError, saveDocs) => {
        if (saveError) {
            httpUtility.sendResponse(res, true, saveError)
        } else {
            httpUtility.sendResponse(res, false, "Gate Created Successfully")
        }
    })
})

router.get('/getGatesUnderControl/:id', (req, res) => {
    station.find({stationMaster: req.params.id},(stationFindError, stationFindDocs)=>{
        if(stationFindError){
            httpUtility.sendResponse(res, true, stationFindError)
        } else {
            if(stationFindDocs.length == 0){
                httpUtility.sendResponse(res, false, "Not Authorized")
            } else {
                stationGateMap.find({stationId: stationFindDocs[0]._id}).populate('gateId').exec((error, stationGateMapDocs)=>{
                    if(error){
                        httpUtility.sendResponse(res, true, error);
                    } else {
                        httpUtility.sendResponse(res, false, stationGateMapDocs)
                    }
                })
            }
        }
    })
})

router.post('updateLocation', (req, res) => {
    gate.findOneAndUpdate({ _id: req.body._id }, {
        $set: {
            gateLocationLatitude: req.body.gateLocationLatitude,
            gateLocationLongitude: req.body.gateLocationLongitude
        }
    }, (updateError, updateDocs) => {
        if (updateError) {
            httpUtility.sendResponse(res, true, updateError)
        } else {
            httpUtility.sendResponse(res, false, "Gate Location Updated!")
        }
    })
})

router.post('/delete', (req, res) => {
    gateKitMap.remove({ gateKitId: req.body._id }, (gateKitRemoveError) => {
        if (gateKitRemoveError) {
            res.json({
                error: true,
                data: gateKitRemoveError
            })
        } else {
            gate.remove({ _id: req.body._id }, (gateRemoveError) => {
                if (gateRemoveError) {
                    httpUtility.sendResponse(res, true, gateRemoveError)
                } else {
                    httpUtility.sendResponse(res, false, "Gate Removed Successfully")
                }
            })
        }
    })
})

module.exports = router