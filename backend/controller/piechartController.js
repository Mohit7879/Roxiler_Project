const Product=require("../model/product.js");
const {getMonth}=require("../utility/getMonth.js")

module.exports.piechart=async (req,res)=>{
  try{
    const month = req.params.month; // Get the selected month from the request parameters
     const selectedMonth= getMonth(month);
    const pipeline=[ 
     {
        $match: {
            $expr: {
                $eq: [{ $month: { date: '$dateOfSale' } }, parseInt(selectedMonth)]
            }
        }
    },

    {
        $group: {
            _id: '$category',
            count: { $sum: 1 }
        }
    }
]
const result = await Product.aggregate(pipeline);

const prettyresult = result.map(obj => ({
    category: obj._id,
    count: obj.count
}));


  res.json(prettyresult);

} catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}}