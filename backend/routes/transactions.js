const router=require('express').Router();
const{ allTransactions }=require("../controller/transactionController.js")

router.get('/allTransactions',allTransactions);


module.exports=router;