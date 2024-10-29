
//access the env variable  always  put at the top 

require('dotenv').config();
const express = require("express");
const app = express();
const userRoute = require("./routes/userRoute");
const dbConnection = require("./db/dbConfig");
const questionRouter=require("./routes/questionRoute")
const authMiddleware=require("./middlware/authMiddlware")


const port = 5000;
//json middleware  to extract jsion data 
app.use(express.json())
// user routes middleware 
app.use("/api/users", userRoute);
app.use("/api/question",authMiddleware, questionRouter);


// Execute DB Query on Server Start
async function start() {
    try {
        // console.log("Attempting to execute query...");
        // const result = await dbConnection.execute("select 'test1' ");
        app.listen(port)
        console.log(`database connection establshed ${port} `)
        console.log("Query executed successfully!");
        // console.log(result); // Log the result if successful
    } catch (err) {
        console.error("Error executing query:", err); // Log the full error object
    }
}

// Start the Express server and the DB query

        start(); // Call the start() function to execute the query when the server starts
 
