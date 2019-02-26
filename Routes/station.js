const express = require('express')
const router = express.Router()
const station = require('../Models/station')
const httpUtiltiy = require('../Modules/httpUtility')

console.log("Loaded Route : station")

router.post('/create',(req, res)=>{
    let newStation = new station({
        stationCode: req.body.stationCode,
        stationMaster: req.body.stationMaster
    })

    newStation.save((saveError, saveDocs)=>{
        if(saveError){
            httpUtiltiy.sendResponse(res, true, saveError)
        } else {
            httpUtiltiy.sendResponse(res, false, "Station Created Successfully")
        }
    })
})

router.get('/getAllStations',(req, res)=>{
    station.find({}).exec((findError, findDocs)=>{
        if(findError){
            httpUtiltiy.sendResponse(res, true, findError)
        } else {
            httpUtiltiy.sendResponse(res, false, findDocs)
        }
    })
})

router.post('/update',(req, res)=>{
    let newStation = {
        stationCode: req.body.stationCode,
        stationMaster: req.body.stationMaster
    }

    station.findOneAndUpdate(req.body._id,{$set: newStation},(updateError, updateDocs)=>{
        if(updateError){
            httpUtiltiy.sendResponse(res, true, updateError)
        } else {
            httpUtiltiy.sendResponse(res, false, "Station Updated!")
        }
    })
})

router.post('/delete',(req, res)=>{
    station.findByIdAndRemove(req.body._id,(removeError, removeDocs)=>{
        if(removeError){
            httpUtiltiy.sendResponse(res, true, removeError)
        } else {
            httpUtiltiy.sendResponse(res, false, "Removed Station Successfully")
        }
    })
})

module.exports = router