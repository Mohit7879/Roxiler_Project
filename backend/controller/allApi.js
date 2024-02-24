const {errorhandler}=require("../utility/error.js")
const {getMonth}=require("../utility/getMonth.js")

const axios = require('axios');
module.exports.allApi= async (req, res,next) => {
    const month = req.params.month;

    const selectedMonth= getMonth(month);
    if(selectedMonth==0){
     
      return next(errorhandler(401,"Invalid month"));
   }
   

    try {
        // Fetch data from all three APIs using Promise.all
        const [statisticsResponse, barChartDataResponse, pieChartDataResponse] = await Promise.all([
            axios.get(`http://localhost:3000/api/statistics/allstatistics/${month}`).catch(error => { return { data: null } }),
            axios.get(`http://localhost:3000/api/barchart/bar-chart/${month}`).catch(error => { return { data: null } }),
            axios.get(`http://localhost:3000/api/piechart/pie-chart/${month}`).catch(error => { return { data: null } })
        ]);

        const responseData = {
            statistics: statisticsResponse.data,
            barChartData: barChartDataResponse.data,
            pieChartData: pieChartDataResponse.data
        };

        res.json(responseData);
    } catch (error) {
      
      next(error)
    }
};


