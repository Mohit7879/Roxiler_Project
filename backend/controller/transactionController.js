


const Product = require("../model/product.js");
function getMonthNumber(month) {
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    return( months.indexOf( month) + 1); // Adding 1 because month indexes start from 0
}

module.exports.allTransactions = async (req, res) => {
    try {
        // Pagination parameters
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;

        // Search parameters
        const search = req.query.search || '';
        let month = (req.query.month || '').toLowerCase(); // Month parameter converted to lowercase

        
    
        // Convert month name to number
       const selectedMonth = getMonthNumber(month);
           


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
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
