const dbConnection = require("../db/dbConfig");
const bycrpt =require("bcrypt")
const jwt = require('jsonwebtoken');
async function addAnswer(req, res) {
    const { answerid, userid, questionid, answer } = req.body;

    // Check if all required fields are provided
    if (!answerid || !userid || !questionid || !answer) {
        return res.status(400).json({ msg: "Please provide all required fields." });
    }
    try {
        const query = `
            INSERT INTO answer (answerid, userid, questionid, answer)
            VALUES (?, ?, ?, ?)
        `;
        const values = [answerid, userid, questionid, answer];

        const [result] = await dbConnection.query(query, values);

        // Send a response indicating success
        return res.status(201).json({
            msg: "Answer added successfully",
            answerId: result.insertId,
        });
    } catch (error) {
        console.error("Error adding answer:", error.message);
        return res.status(500).json({ msg: "Failed to add answer, try again later." });
    }
}
module.exports = {
    addAnswer,
};
