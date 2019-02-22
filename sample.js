const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));
// Read the port data
port.on("open", () => {
  console.log('Serial Port /dev/ttyACM0 now OPEN');
});
// parser.on('data', data =>{
//   console.log('Message Received : ', data);
// });
var buffer = Buffer('Hello Arduino!', 'utf8')
  port.write(buffer, function (err, result) {
    if (err) {
        console.log('Error while sending message : ' + err);
    }
    if (result) {
        console.log('Response received after sending message : ' + result);
    }    
  });