const express = require('express')
const router = express.Router()
const serialPort = require('../Modules/serialPort')

console.log('Loaded Route : TrainDetector')

router.get('/testLEDOn',(req, res)=>{
    serialPort.sendMessage('on')
    res.send('LED On')
})

router.get('/testLEDOff',(req, res)=>{
    serialPort.sendMessage('off')
    res.send('LED Off')
})

module.exports = router