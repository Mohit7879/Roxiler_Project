const Product = require('../model/product.js');
const {getMonth}=require("../utility/getMonth.js")
const {errorhandler}=require("../utility/error.js")

// Define API endpoint for bar chart
 module.exports.barchart=async (req, res,next) => {
    try {
        const month = req.params.month;
        const selectedMonth=getMonth(month);

        if(selectedMonth==0){
           
           return next(errorhandler(401,"Invalid month"));
        }

        const maxPriceDoc = await Product.findOne().sort({ price: -1 });

        if (!maxPriceDoc) {
            return res.status(404).json({ error: 'No products found' });
        }

        const maxPrice = maxPriceDoc.price;



 // Initialize an empty array to store the price ranges
const priceRanges = [];

// Define the size of each price range
const rangeSize = 500;

// Calculate the number of ranges needed
const numberOfRanges = Math.ceil(maxPrice / rangeSize);

// Loop through the number of ranges to generate the ranges
for (let i = 0; i < numberOfRanges; i++) {
    const range = {
        min: i * rangeSize,
        max: Math.min((i + 1) * rangeSize, maxPrice) // Ensure the max value doesn't exceed the maximum price
    };
    priceRanges.push(range);


}

        

// Construct aggregation pipeline to group products by price range
        const pipeline = [
            {
                $match: {
                    $expr: { $eq: [{ $month: '$dateOfSale' }, selectedMonth] } // Match products for the selected month
                }
            },
            {
                $bucket: {
                    groupBy: "$price",
                    boundaries: priceRanges.map(range => range.min), // Use the min values as boundaries
                    default: "Other", // If a document doesn't fall into any bucket, group it as "Other"
                    output: {
                        count: { $sum: 1 } // Count the number of documents in each bucket
                    }
                }
            }
        ];



    // Execute the aggregation pipeline
        const result = await Product.aggregate(pipeline);
          
      
      
        res.json({
           "explanation": `explanation:_id is minimum value of range and count is number of sale in that range : for example `,
           Example:getPrettyresult(result,rangeSize),
            result
        }
        );

    } catch (error) {
       next(error)
    }
};




// created a separate function for pretty data

function getPrettyresult(result,rangeSize){

    let chartData=[];
    for(let i=0;i<result.length-2;i++){
    let range=`${result[i]._id} - ${result[i+1]._id}`;
    let count=result[i].count;

    let obj={
     [range]:count
    }
    chartData.push(obj);


    }

  { let range=`${result[result.length-2]._id} - ${(result[result.length-2]._id)+rangeSize}`;
   let count=result[result.length-2].count;


    let obj={
     [range]:count
    }

    chartData.push(obj);}
   
    let range=`  ${(result[result.length-2]._id)+rangeSize}-${result[result.length-1]._id}`;
    let count=result[result.length-1].count;


     let obj={
      [range]:count
     }
     
     chartData.push(obj);
    
  return chartData;


}


