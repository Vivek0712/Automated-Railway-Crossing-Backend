/**
 * Author : Aravind S
 * Project Name : Automated Railway Crossing - Backend
 * Creation Date : 22-FEB-2019
 */

// Import the required Modules
const express = require('express')
const bodyparser = require('body-parser')
// END Import

// Constants for the project
const PORT = 3000
// Create an Express.js Application
const app = express()

// Body Parser Middleware
app.use(bodyparser.json())

// Hello World Method
app.get('/helloWorld',(req, res)=>{
  res.send('Hello World!!!')
})

// Create a Web server that listens of PORT
app.listen(PORT, () => {
  console.log('Server Started on Port ' + PORT)
})