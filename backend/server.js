const express= require('express');
const port=3000;
const app=express();
const mongoose =require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO)
.then(()=> {
    console.log("App is now connected to DB")
}).catch((err)=> {
    console.log(`${err}`);
})


app.listen(port,(err)=>{
    console.log('server is successful',port);
    if(err){
        console.log("error in server",err);
    }
})











