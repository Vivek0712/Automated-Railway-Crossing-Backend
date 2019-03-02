
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const serialPortIdentifier = '/dev/ttyACM0'

const serialPort = new SerialPort(serialPortIdentifier, { baudRate: 19200 });

const dataParser = serialPort.pipe(new Readline({ delimiter: '\r\n' }));

serialPort.on("open", () => {
    console.log('\nSerial Port ' + serialPortIdentifier + ' now OPEN\n');
});

dataParser.on('data', (data) => {
        var firstLine = data.split(",");
        var phno = firstLine[2];
        var msg = data.split("\n");
        msg =msg[1];
        var val = new Array(phno,msg);
        return val;
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