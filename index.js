const express = require('express')

const PORT = 3000

const app = express()
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const serialPORT = '/dev/ttyACM0'

const port = new SerialPort(serialPORT, { baudRate: 9600});

const parser = port.pipe(new Readline({ delimiter: '\n' }));

port.on("open", () => {
    console.log('Serial Port '+serialPORT+' now OPEN');
  });

  parser.on('data', (data)=>{
      console.log("Received : " + data)
  })

app.get('/test/:command',(req, res)=>{

port.flush((error)=>{
    port.write(req.params.command,(error, count)=>{
        if(error){
          console.log(error)
        } else {
            console.log("Message transmitted Successfully!!!")
        }
      })
});

res.send('OKAY')
})

app.listen(PORT, ()=>{
    console.log('Server Started on Port ' + PORT)
})