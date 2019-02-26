const express = require('express')
const router = express.Router()
const httpUtility = require('../Modules/httpUtility')
const stationTrainSensorMap = require('../Models/stationTrainSensorMap')
const station = require('../Models/station')

console.log('Loaded Route : StationTrainSensorMap')

router.post('/create', (req, res) => {
    let newStationTrainSensorMap = new stationTrainSensorMap({
        stationId: req.body.stationId,
        trainSensorId: req.body.trainSensorId
    })

    newStationTrainSensorMap.save((saveError, saveDocs) => {
        if (saveError) {
            httpUtility.sendResponse(res, true, saveError)
        } else {
            httpUtility.sendResponse(res, false, "Station and Train Sensor Mapped Successfully")
        }
    })
})

router.get('/getAllStationTrainSensorMaps', (req, res) => {
    stationTrainSensorMap.find({}).populate('stationId').populate('gateId').exec((stationGateMapFindError, stationGateMapDocs) => {
        if (stationGateMapFindError) {
            httpUtility.sendResponse(res, true, stationGateMapFindError)
        } else {
            httpUtility.sendResponse(res, false, stationGateMapDocs)
        }
    })
})

router.get('/getStationTrainSensorMaps/:id', (req, res) => {
    station.find({stationMaster: req.params.id},(stationFindError, stationFindDocs)=>{
        if(stationFindError){
            httpUtility.sendResponse(res, true, stationFindError)
        } else {
            if(stationFindDocs.length == 0){
                httpUtility.sendResponse(res, false, "Not Authorized")
            } else {
                stationTrainSensorMap.find({stationId: stationFindDocs[0]._id}).populate('stationId').populate('gateId').exec((stationGateMapFindError, stationGateMapDocs) => {
                    if (stationGateMapFindError) {
                        httpUtility.sendResponse(res, true, stationGateMapFindError)
                    } else {
                        httpUtility.sendResponse(res, false, stationGateMapDocs)
                    }
                })
            }
        }
    })
})

router.get('/delete', (req, res) => {
    stationTrainSensorMap.remove({ _id: req.body._id }, (removeError, removeDocs) => {
        if (removeError) {
            httpUtility.sendResponse(res, true, removeError)
        } else {
            httpUtility.sendResponse(res, false, "Station-Train Sensor Mapping removed Successfully")
        }
    })
})


module.exports = router