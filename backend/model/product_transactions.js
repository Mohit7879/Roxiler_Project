const mongoose= require('mongoose');
const productSchema = new mongoose.Schema({
   
    productid:{
        type:Number,
        required:true,
        unique:true,
    },

    title:{
        type:String,
        required:true,

    },

    price:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true,

    },

    category:{
        type:String,
        required:true,
 
    },

    image:{

        type:String,
        required:true,

    },

    sold:{
        type:Boolean,
        required :true,
    },

    dateOfSale:{
        type:String,
        required:true,
    }



},
{
    timestamps:true,
})

module.exports=mongoose.model('Product',productSchema);