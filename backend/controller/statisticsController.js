const Products = require("../model/product.js");
const {getMonth}=require("../utility/getMonth.js")
const {errorhandler}=require("../utility/error.js")

module.exports.allstatistics= async (req, res,next) => {
  try {


    let month = (req.params.month || '')
    const selectedMonth = getMonth(month); 
    if(selectedMonth==0){
        
       return next(errorhandler(401,"Invalid month"));
    }

    // Calculate total sale amount of selected month
    const totalSaleAmount = await Products.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(selectedMonth)] }
        },

        
      },
      {
        $match: {
          sold:true
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$price' }
        }
      }
    ]);
console.log(totalSaleAmount)
    // Calculate total number of sold items of selected month
    const totalSoldItems = await Products.countDocuments({
      $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(selectedMonth)] },
      sold: true
    });

    // Calculate total number of not sold items of selected month
    const totalUnsoldItems = await Products.countDocuments({
      $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(selectedMonth)] },
      sold: false
    });

    // Return the statistics as JSON response
    res.json({
      totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems,
      totalUnsoldItems
    });
  } catch (error) {
   next(error)
  }
};


