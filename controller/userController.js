const dbConnection = require("../db/dbConfig");
const bycrpt =require("bcrypt")
const jwt = require('jsonwebtoken');

const { StatusCodes, ReasonPhrases } = require('http-status-codes');
async function register(req,res){
const {username,firstname,lastname,email,password}=req.body
if(!username|| !firstname|| !lastname|| !email|| !password){
   return res.status(401).json({msg:"please provide all required infrmation"})
}
try{
    const [user]=await dbConnection.query("select username,userid from users where username =? or email=?",[username,email])
   if(user.length>0)
   {
   return res.status(400).json({msg:"user is already exist"})
   }
   if(password.length<=8){
   return res.status(400).json({msg:"password legnth must be minimum 8"})
   }
   // encrypt password
   const salt= await bycrpt.genSalt(10)
   const hashedpasswrod=await bycrpt.hash(password,salt)
    // return res.json({user:user})
const query=await dbConnection.query("insert into users(username,firstname,lastname,email,password)values(?,?,?,?,?)",[username,firstname,lastname,email, hashedpasswrod])

return res.status(201).json({msg:"User registered successfully"})
}catch{
    console.log(error.message)
    return res.status(500).json({msg:"some thing wrong try agian later"})
    
}
}
async function checkUser(req,res){
  const username=req.user.username
  const userid=req.user.userid
   res.status(200).json({msg:"valid user",username,userid})
}
async function login(req,res){
  const {email,password}=req.body
  if(!email||!password){
  return res.status(400).json({msg:"plase proved email or password"})
  }
  try{
    const [rows] = await dbConnection.query("SELECT userid,username,password FROM users WHERE email = ?", [email]);
// const user = rows[0]; // Get the first result from the rows array
// return res.json({ user });
if (rows.length === 0) {
    return res.status(400).json({ msg: "Invalid credentials" });
} 
//else {
//     return res.status(200).json({ msg: "User exists" });
// }
const ismatch=await bycrpt.compare(password,rows[0].password)
if(!ismatch){
    return res.status(400).json({msg:"password is wrong"})
    
}
const username=rows[0].username;
const userid=rows[0].userid;
const token=jwt.sign({username,userid},process.env.JWT_SECRET,{expiresIn:"1d"})
return res.status(200).json({
  msg:"user login successful",token
})
// return res.status(400).json({rows:rows[0].password})
  }catch(error){
    console.log(error.message)
    return res.status(500).json({msg:"some thing wrong try agian later"})
  }
}
module.exports={register,login,checkUser}