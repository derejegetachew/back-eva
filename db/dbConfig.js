const mysql2=require("mysql2");

//development 
// const dbConnection=mysql2.createPool({
//     user:"dere-admin",
//     database:"evangadi-db",
//     host:"localhost",
//     password:"12456",
//     connectionLimit:10
// })
// dbConnection.execute("select 'test'",(err,result)=>{
//     if(err){
//         console.log(err.message)
//     }
//     else{
//         console.log(result);
//     }
// } )
//production 
const dbConnection=mysql2.createPool({
    user:process.env.USER,
    database:process.env.DATABASE,
    host:"localhost",
    password:process.env.PASSWORD,
    connectionLimit:10
    
})
console.log(process.env.DATABASE)

module.exports=dbConnection.promise()