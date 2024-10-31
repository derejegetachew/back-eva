const dbConnection = require("../db/dbConfig");
const bycrpt =require("bcrypt")
const jwt = require('jsonwebtoken');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
async function addQuestion(req, res) {
    const { questionid, userid, title, description, tag } = req.body;

    // Check if all required fields are provided
    if (!questionid || !userid || !title || !description || !tag) {
        return res.status(400).json({ msg: "Please provide all required fields." });
    }
    try {
        const query = `
            INSERT INTO questions (questionid, userid, title, description, tag)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [questionid, userid, title, description, tag];

        const [result] = await dbConnection.query(query, values);

        // Send a response indicating success
        return res.status(201).json({
            msg: "Question added successfully",
            questionId: result.insertId,
        });
    } catch (error) {
        console.error("Error adding question:", error.message);
        return res.status(500).json({ msg: "Failed to add question, try again later." });
    }
}
module.exports = {
    addQuestion,
};