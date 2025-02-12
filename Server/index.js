//import dotenv //to load environment variables
require('dotenv').config()
//import express
const express = require('express')
//import cors
const cors = require('cors')

//import router
const router = require('./routes')

//import connection.js
require('./connection')

//create server
const pfServer = express()
//use cors //cors use to communicate with the view
pfServer.use(cors())
//use json() //Returns middleware that only parses json 
pfServer.use(express.json())
//use router 
pfServer.use(router)
//setting port for server
PORT = 4000 || process.env.PORT
//listen to the port
pfServer.listen(PORT, () => {
    console.log(`Server is running successfully at port : ${PORT}`)
    })
    
    //server tested
    // pfServer.get('/',(req,res)=>{
    //     res.send('Hello from server')
    // })