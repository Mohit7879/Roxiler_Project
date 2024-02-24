
const axios = require('axios');
module.exports.allApi= async (req, res) => {
    const month = req.params.month;
   

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
        console.error('Error fetching combined data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


