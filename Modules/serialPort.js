const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const serialPortIdentifier = '/dev/ttyACM0'
const config = require('./config')

const gate = require('../Models/gate')
const gateKitMap = require('../Models/gateKitMap')
const trainSensor = require('../Models/trainSensor')

const serialPort = new SerialPort(serialPortIdentifier, { baudRate: 19200 });

const dataParser = serialPort.pipe(new Readline({ delimiter: '\0' }));

serialPort.on("open", () => {
    console.log('\nSerial Port ' + serialPortIdentifier + ' now OPEN\n');
});

dataParser.on('data', (data) => {
    console.log('---Message Start---' + data + '----Message End---')
})

serialPort.sendMessage = function (message) {
    serialPort.write(message, (error, count) => {
        if (error) {
            console.log(error)
        } else {
            console.log("\nMessage : '" + message + "' transmitted Successfully!!!\n")
        }
    })
}

function senseCommand(number, command) {
    switch (command) {
        case config.messageCodes.toServerGateClosed:
            gate.findOneAndUpdate({ gsmPhoneNumber: number }, { $set: { gateOpened: false } }).exec((updateError, updateDocs) => {
                if (updateError) {
                    console.log('Error : ' + updateError)
                } else {
                    console.log('Gate Status Set : CLOSED')
                }
            })
            break;
        case config.messageCodes.toServerGateOpened:
            gate.findOneAndUpdate({ gsmPhoneNumber: number }, { $set: { gateOpened: true } }).exec((updateError, updateDocs) => {
                if (updateError) {
                    console.log('Error : ' + updateError)
                } else {
                    console.log('Gate Status Set : OPEN')
                }
            })
            break;
        case config.messageCodes.toServerTrainDetectedNonDirectionalised:
            console.log('Message Code : toServerTrainDetectedNonDirectionalised')
            trainSensor.find({ gsmPhoneNumber: number }).exec((trainSensorFindError, trainSensorFindDocs) => {
                if (trainSensorFindError) {
                    console.log('Error : ' + trainSensorFindError)
                } else {
                    gateKitMap.find({ trainSensorId: trainSensorFindDocs[0]._id }).populate('trainSensorId').populate('gateKitId').exec((gateKitMapFindError, gateKitMapFindDocs) => {
                        if (gateKitMapFindError) {
                            console.log('Error : ' + gateKitMapFindError)
                        } else {
                            gateKitMapFindDocs = gateKitMapFindDocs.filter((doc)=>{
                                return !doc.trainSensorId._id == trainSensorFindDocs[0]._id
                            })
                            const gateKitNumber = gateKitMapFindDocs[0].gateId.gsmPhoneNumber
                            if(gateKitMapFindDocs[0].trainSensorId.isSensed){
                                // Train is leaving - Open the Gate
                                serialPort.sendMessage(gateKitNumber+';'+config.messageCodes.fromServerGateOpen)
                            } else {
                                // Train is approaching - Close the Gate
                                serialPort.sendMessage(gateKitNumber+';'+config.messageCodes.fromServerGateClose)
                            }
                        }
                    })
                }
            })
            break;
        default:
            console.log('Number : ' + number + ', Command : ' + command + ' : Invalid Command Combination')
            break;
    }
}

function parseSMS(recSMS) {
    recSMS = recSMS.replace("\"", '');
    pattern = /\nCMT: \+[0-9]{10},,[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,2},[0-9]{2}:[0-9]{2}:[0-9]{2}\+[0-9]{2}\n[a-zA-Z0-9]{2}/
    if (RegExp(patt).test(recSMS)) {
        var firstLine = recSMS.split(" ");
        var phno = firstLine[1];
        var msg = recSMS.split("\n");
        msg = msg[2];
        var val = {
            phoneNumber: phno,
            command: msg
        };
        return {
            success: true,
            data: val
        };
    }
    else
        return {
            success: false
        };
}


module.exports = serialPort