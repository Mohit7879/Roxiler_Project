const Product = require("../model/product.js");
const {getMonth}=require("../utility/getMonth.js")
const {errorhandler}=require("../utility/error.js")


module.exports.allTransactions = async (req, res,next) => {
    try {
        // Pagination parameters
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;

        // Search parameters
        const search = req.query.search || '';
        let month = (req.query.month || '')

        
    
        // Convert month name to number
       const selectedMonth = getMonth(month);
       if(selectedMonth==0){
        
        return next(errorhandler(401,"Invalid month"));
     }
           


        // Mongoose aggregation pipeline
        const pipeline = [];

     
       
      //  Match stage to filter based on search criteria
        if (search) {
            pipeline.push({
                $match: {
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
                        { price: parseFloat(search) || 0 }
                    ]
                }
            });
        }

        // Skip and limit stages for pagination
        pipeline.push(
            { $skip: (page - 1) * perPage },
            { $limit: perPage }
        );
             
        
        // Match stage to filter by selected month
        if (month) {
            pipeline.push({
                $match: {
                    $expr: {
                        $eq: [
                            { $month: { date: '$dateOfSale' } }, // Extract month from dateOfSale field
                            selectedMonth
                        ]
                    }
                }
            });
        }


        // Execute aggregation pipeline
        const transactions = await Product.aggregate(pipeline);

        res.json(transactions);
    } catch (error) {
       next(error);
    }
}
