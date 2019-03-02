/**
 * Author : Aravind S
 * Project Name : Automated Railway Crossing - Backend
 * Creation Date : 22-FEB-2019
 */

// Import the required Modules
const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./Modules/config')
const serialPort = require('./Modules/serialPort')
const cors = require('cors')
// END Import

// Constants for the project
const PORT = 3000
// Create an Express.js Application
const app = express()

// Body Parser Middleware
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));

// CORS Middleware
app.use(cors({origin:'http://localhost:4200'}))


// Routes Import
console.log('\n******************* Importing Required Routes *******************\n')
const gateRoute = require('./Routes/gate')
const gateKeeperMapRoute = require('./Routes/gateKeeperMap')
// const gateKitMapRoute = require('./Routes/gateKitMap')
const roleRoute = require('./Routes/role')
const roleMapRoute = require('./Routes/roleMap')
// const stationRoute = require('./Routes/station')
// const stationGateMapRoute = require('./Routes/stationGatemap')
// const stationTrainSensorMapRoute = require('./Routes/stationTrainSensorMap')
// const trainSensorRoute = require('./Routes/trainSensor')
const userRoute = require('./Routes/user')
console.log('\n******************* Finished Importing Routes *******************\n')
// END Import

// Apply Routes to Express.js App
app.use('/gate', gateRoute)
app.use('/gateKeeperMap', gateKeeperMapRoute)
// app.use('/gateKitMap', gateKitMapRoute)
app.use('/role', roleRoute)
app.use('/roleMap', roleMapRoute)
// app.use('/station', stationRoute)
// app.use('/stationGateMap', stationGateMapRoute)
// app.use('/stationTrainSensorMap', stationTrainSensorMapRoute)
// app.use('/trainSensor', trainSensorRoute)
app.use('/user', userRoute)

// Hello World Method
app.get('/testCommand/:command', (req, res) => {
  serialPort.sendMessage(req.params.command)
  res.send('Command Sent')
})


// Attempt Connection to Database
mongoose.connect(config.database.connectionString, { useNewUrlParser: true }, (connectionError) => {
  // Create a Web server that listens of PORT
  if (connectionError) {
    console.log('Cannot connect to Database : ' + connectionError)
  } else {
    app.listen(PORT, () => {
      console.log('Server Successfully Started on Port ' + PORT + '\nDatabase Location : ' + config.database.connectionString)
    })
  }
})
