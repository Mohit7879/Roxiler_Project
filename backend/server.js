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



async function setdata() {
    const apiUrl = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        
       // Check the fetched data

        // Iterate over each object in the data array and create a product for each
        await Product.insertMany(data);

        console.log('Products created successfully');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}








app.listen(port,(err)=>{
    console.log('server is successful',port);
    if(err){
        console.log("error in server",err);
    }
})

app.use("/",require("./routes/index.js"));

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'Interval Server Error';
    console.log(message);
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})







