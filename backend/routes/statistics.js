const router=require('express').Router();
const{ allstatistics }=require("../controller/statisticsController.js")

router.get('/allstatistics',allstatistics);


module.exports=router;