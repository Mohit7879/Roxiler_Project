const router=require('express').Router();
const{ barchart }=require("../controller/barchartController.js")

router.get('/bar-chart/:month',barchart)


module.exports=router;