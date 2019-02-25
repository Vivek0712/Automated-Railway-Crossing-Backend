
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const serialPortIdentifier = '/dev/ttyACM0'

const serialPort = new SerialPort(serialPortIdentifier, { baudRate: 115200 });

const dataParser = serialPort.pipe(new Readline({ delimiter: '\n' }));

serialPort.on("open", () => {
    console.log('\nSerial Port ' + serialPortIdentifier + ' now OPEN\n');
});

dataParser.on('data', (data) => {
    console.log("\nReceived : " + data+'\n')
})

serialPort.sendMessage = function (message) {
    serialPort.write(message, (error, count) => {
        if (error) {
            console.log(error)
        } else {
            console.log("\nMessage : '"+ message +"' transmitted Successfully!!!\n")
        }
    })
}

module.exports = serialPort