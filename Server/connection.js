// import mongoose

const mongoose = require('mongoose')

const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("mongodb connected succesffully");
    
}).catch((err)=>{
    console.log(`not connected due to ${err}`);
    
})