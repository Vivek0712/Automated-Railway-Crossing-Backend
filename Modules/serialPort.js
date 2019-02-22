const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const serialPortIdentifier = '/dev/ttyACM0'


const serialPort = new SerialPort(serialPortIdentifier, { baudRate: 115200 });

const dataParser = serialPort.pipe(new Readline({ delimiter: '\n' }));

serialPort.on("open", () => {
    console.log('Serial Port ' + serialPortIdentifier + ' now OPEN');
});

dataParser.on('data', (data) => {
    console.log("Received : " + data)
})

serialPort.sendMessage = function (message) {
    serialPort.write(message, (error, count) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Message transmitted Successfully!!!")
        }
    })
}

module.exports = serialPort