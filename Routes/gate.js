const express = require('express')
const router = express.Router()
const gate = require('../Models/gate')
const gateKitMap = require('../Models/gateKitMap')
const station = require('../Models/station')
const serialPort = require('../Modules/serialPort')
const httpUtility = require('../Modules/httpUtility')
const stationGateMap = require('../Models/stationGateMap')
const config = require('../Modules/config')

console.log('Loaded Route : Gate')

router.post('/create', (req, res) => {
    let newGate = new gate({
        gateId: req.body.gateId,
        gsmPhoneNumber: req.body.gsmPhoneNumber,
        gateOpened: true,
        gateLocationLatitude: req.body.gateLocationLatitude,
        gateLocationLongitude: req.body.gateLocationLongitude,
        trainApproaching: false
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
    station.find({ stationMaster: req.params.id }, (stationFindError, stationFindDocs) => {
        if (stationFindError) {
            httpUtility.sendResponse(res, true, stationFindError)
        } else {
            if (stationFindDocs.length == 0) {
                httpUtility.sendResponse(res, false, "Not Authorized")
            } else {
                stationGateMap.find({ stationId: stationFindDocs[0]._id }).populate('gateId').exec((error, stationGateMapDocs) => {
                    if (error) {
                        httpUtility.sendResponse(res, true, error);
                    } else {
                        httpUtility.sendResponse(res, false, stationGateMapDocs)
                    }
                })
            }
        }
    })
})

router.get('/isTrainApproachingGate/:id', (req, res) => {
    gate.find({ _id: req.params.id }).exec((findError, findDocs) => {
        if (findError) {
            httpUtility.sendResponse(res, true, findError)
        } else {
            if (findDocs.length == 0) {
                httpUtility.sendResponse(res, false, 'Cannot find a gate')
            } else {
                httpUtility.sendResponse(res, false, findDocs[0].trainApproaching)
            }
        }
    })
})

router.get('/isGateOpened/:id', (req, res) => {
    gate.find({ _id: req.params.id }).exec((findError, findDocs) => {
        if (findError) {
            httpUtility.sendResponse(res, true, findError)
        } else {
            if (findDocs.length == 0) {
                httpUtility.sendResponse(res, false, 'Cannot find a gate')
            } else {
                httpUtility.sendResponse(res, false, findDocs[0].gateOpened)
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

router.get('/getGateStatus/:id', (req, res) => {
    gate.find({ _id: req.params.id }).exec((findError, findDocs) => {
        if (findError) {
            httpUtility.sendResponse(res, true, findError)
        } else {
            if (findDocs.length == 0) {
                httpUtility.sendResponse(res, false, 'No Gates Found')
            } else {
                httpUtility.sendResponse(res, false, findDocs[0].gateOpened)
            }
        }
    })
})

router.get('/getTrainApproaching/:id', (req, res) => {
    gate.find({ _id: req.params.id }).exec((findError, findDocs) => {
        if (findError) {
            httpUtility.sendResponse(res, true, findError)
        } else {
            if (findDocs.length == 0) {
                httpUtility.sendResponse(res, false, 'No Gates Found')
            } else {
                httpUtility.sendResponse(res, false, findDocs[0].trainApproaching)
            }
        }
    })
})

router.post('/openGate', (req, res) => {
    gate.find({ _id: req.body.gateId }).exec((findError, findDocs) => {
        if (findError) {
            httpUtility.sendResponse(res, true, findError)
        } else {
            if (findDocs.length == 0) {
                httpUtility.sendResponse(res, false, 'Invalid Gate Id')
            } else {
                serialPort.sendMessage(findDocs[0].gsmPhoneNumber + ';' + config.messageCodes.fromServerGateOpen)
                httpUtility.sendResponse(res, false, 'Command Issued')
            }
        }
    })
})

router.post('/closeGate', (req, res) => {
    gate.find({ _id: req.body.gateId }).exec((findError, findDocs) => {
        if (findError) {
            httpUtility.sendResponse(res, true, findError)
        } else {
            if (findDocs.length == 0) {
                httpUtility.sendResponse(res, false, 'Invalid Gate Id')
            } else {
                serialPort.sendMessage(findDocs[0].gsmPhoneNumber + ';' + config.messageCodes.fromServerGateClose)
                httpUtility.sendResponse(res, false, 'Command Issued')
            }
        }
    })
})

module.exports = router