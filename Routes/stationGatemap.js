const express = require('express')
const router = express.Router()
const httpUtility = require('../Modules/httpUtility')
const stationGateMap = require('../Models/stationGateMap')

console.log('Loaded Route : StationGateMap')

router.post('/create', (req, res) => {
    let newStationGateMap = new stationGateMap({
        stationId: req.body.stationId,
        gateId: req.body.gateId
    })

    newStationGateMap.save((saveError, saveDocs) => {
        if (saveError) {
            httpUtility.sendResponse(res, true, saveError)
        } else {
            httpUtility.sendResponse(res, false, "Station and Gate Mapped Successfully")
        }
    })
})

router.get('/getStationGateMaps', (req, res) => {
    stationGateMap.find({}).populate('stationId').populate('gateId').exec((stationGateMapFindError, stationGateMapDocs) => {
        if (stationGateMapFindError) {
            httpUtility.sendResponse(res, true, stationGateMapFindError)
        } else {
            httpUtility.sendResponse(res, false, stationGateMapDocs)
        }
    })
})

router.get('/delete', (req, res) => {
    stationGateMap.remove({ _id: req.body._id }, (removeError, removeDocs) => {
        if (removeError) {
            httpUtility.sendResponse(res, true, removeError)
        } else {
            httpUtility.sendResponse(res, false, "Station-Gate Mapping removed Successfully")
        }
    })
})


module.exports = router