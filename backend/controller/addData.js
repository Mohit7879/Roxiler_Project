const Product=require("../model/product.js");

module.exports.addData=async ()=> {
    const apiUrl = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        
     

        // Iterate over each object in the data array and create a product for each
        await Product.insertMany(data);

        return res.status(200).json("product created successfully");
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}