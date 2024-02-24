const Product=require("../model/product.js");
const {getMonth}=require("../utility/getMonth.js")
const {errorhandler}=require("../utility/error.js")

module.exports.piechart=async (req,res,next)=>{
  try{
    const month = req.params.month; // Get the selected month from the request parameters
     const selectedMonth= getMonth(month);
     if(selectedMonth==0){
     
       return next(errorhandler(401,"Invalid month"));
    }
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
   next(error);
}}