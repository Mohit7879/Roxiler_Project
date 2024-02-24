const router=require('express').Router();
const{allApi }=require("../controller/allApi.js")

router.get('/allApidata/:month',allApi)


module.exports=router;