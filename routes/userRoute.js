const express=require("express")
const router =express.Router();
//const {register,checkUser,login}=require("../controller/userController")//  distractor object declaring
const userRoute=require("../controller/userController")
//registraton route 
router.post("/register",userRoute.register)
//login user
router.post("/login",userRoute.login)
// check user
router.get("/check",userRoute.checkUser)
module.exports=router;