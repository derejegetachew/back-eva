const express=require("express");
const app=express();
const port=5000;
app.listen(port,(err)=>
{
    if(err){
        console.log(err.message);
    }
    else{
        console.log(`running on ${port}` )
    }
})