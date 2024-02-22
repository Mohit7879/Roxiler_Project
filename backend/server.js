const express= require('express');
const port=3000;
const app=express();




app.listen(port,(err)=>{
    console.log('server is successful',port);
    if(err){
        console.log("error in server",err);
    }
})











