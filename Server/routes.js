//1import express
const express =  require('express')
//import usercontroller file
const userController = require('./controller/userControlller')
//2create object for router class
const router = new express.Router()


//4setup path
//register
router.post('/register',userController.registerController)
//login
router.post('/login',userController.loginController)
 




//3export the router
module.exports = router;