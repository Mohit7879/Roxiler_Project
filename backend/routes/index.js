const router=require('express').Router();
const{ addData }=require('../controller/addData.js')

router.get('/api/addData',addData)


module.exports=router;