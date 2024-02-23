const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   id:{
    type:Number,
    unique:true,
    required:true,
   },
    title: {
        type: String,
        required:true,
    },
    price: {
        type: Number,
        required:true,
    },
    description: {
        type: String,
        required:true,
    },
    category: {
        type: String,
        required:true,
    },
    image: {
        type: String,
        required:true,
    },
    sold: {
        type: Boolean,
        required:true,
    },
    dateOfSale: {
        type: Date,
        required:true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Pr', productSchema);
