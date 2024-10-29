const express=require("express")
const router =express.Router();
//autintication middlware  
const authMiddleware=require("../middlware/authMiddlware")
//const {register,checkUser,login}=require("../controller/us
router.get("/all-question",(req,res)=>{
    res.send("all qustion")
})
module.exports=router;