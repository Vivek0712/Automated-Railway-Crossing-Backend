const express = require('express')
const serialPort = require('./Modules/serialPort')

const PORT = 3000
const app = express()

var toggle = true

app.get('/toggleLED', (req, res) => {
  // serialPort.flush((error) => {
  //   if(!error){
      
  //   } else {
  //     console.log('An error occured while transmitting data')
  //   }
  // });
  if(toggle){
    serialPort.sendMessage('on')
  } else {
    serialPort.sendMessage('off')    
  }
  toggle = !toggle
  res.send('Command Sent')
})

app.listen(PORT, () => {
  console.log('Server Started on Port ' + PORT)
})