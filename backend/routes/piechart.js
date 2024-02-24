const router=require('express').Router();
const{ piechart }=require("../controller/piechartController.js");

router.get('/pie-chart/:month',piechart)


module.exports=router;