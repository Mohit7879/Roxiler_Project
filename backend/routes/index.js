const router=require('express').Router();
const{ addData }=require('../controller/addData.js')

router.get('/api/addData',addData)
router.use('/api/transactions',require("../routes/transactions.js"));
router.use('/api/statistics',require("../routes/statistics.js"));


module.exports=router;