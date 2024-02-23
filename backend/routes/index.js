const router=require('express').Router();
const{ addData }=require('../controller/addData.js')

router.get('/api/addData',addData)
router.use('/api/transactions',require("../routes/transactions.js"));


module.exports=router;