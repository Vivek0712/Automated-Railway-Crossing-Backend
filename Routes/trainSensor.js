const express = require('express')
const router = express.Router()
const trainSensor = require('../Models/trainSensor')
const station = require('../Models/station')
const stationTrainSensorMap = require('../Models/stationTrainSensorMap.js')
const serialPort = require('../Modules/serialPort')

console.log('Loaded Route : TrainSensor')

router.post('/create', (req, res) => {
    let newTrainSensor = new trainSensor({
        gsmPhoneNumber: req.body.gsmPhoneNumber,
        locationLatitude: req.body.locationLatitude,
        locationLongitude: req.body.locationLongitude,
        lastBeacon: req.body.lastBeacon
    })

    newTrainSensor.save((saveError, saveDocs) => {
        if (saveError) {
            res.json({
                error: true,
                data: saveError
            })
        } else {
            res.json({
                error: false,
                data: "New Train Sensor Created!"
            })
        }
    })
})

router.get('/getTrainDetectorsUnderControl/:id',(req, res)=>{
    station.find({stationMaster: req.params.id},(stationFindError, stationFindDocs)=>{
        if(stationFindError){
            httpUtility.sendResponse(res, true, stationFindError)
        } else {
            if(stationFindDocs.length == 0){
                httpUtility.sendResponse(res, false, "Not Authorized")
            } else {
                stationTrainSensorMap.find({stationId: stationFindDocs[0]._id}).populate('trainSensorId').exec((error, stationTrainSensorMapDocs)=>{
                    if(error){
                        httpUtility.sendResponse(res, true, error);
                    } else {
                        httpUtility.sendResponse(res, false, stationTrainSensorMapDocs)
                    }
                })
            }
        }
    })
})

router.post('updateLocation', (req, res) => {
    trainSensor.findOneAndUpdate({ _id: req.body._id }, { 
        $set: { 
            locationLatitude: req.body.locationLatitude, 
            locationLongitude: req.body.locationLongitude 
        } 
    }, (updateError, updateDocs) => {
        if(updateError){
            res.json({
                error: true,
                data: updateError
            })
        } else {
            res.json({
                error: false,
                data: "Train Sensor Location Updated!"
            })
        }
    })
})

router.post('/delete', (req, res)=>{
    gateKitMap.remove({trainSensorId: req.body._id},(gateKitRemoveError)=>{
        if(gateKitRemoveError){
            res.json({
                error: true,
                data: gateKitRemoveError
            })
        } else {
            trainSensor.remove({_id: req.body._id}, (trainSensorRemoveError)=>{
                if(trainSensorRemoveError){
                    res.json({
                        error: true,
                        data: trainSensorRemoveError
                    })
                } else {
                    res.json({
                        error: false,
                        data: 'Train Sensor Removed Successfully'
                    })
                }
            })
        }
    })
})

module.exports = router