const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || "fallback_secret_here";
 // For testing only
async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    // Check if the auth header is present and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Authentication token is missing or invalid" });
    }
    // Extract the token
    const token = authHeader.split(" ")[1];
    console.log(authHeader);
    console.log("Received Token:", token); // Log the received token
    try {
        // Verify the token
        const { username, userid } = jwt.verify(token,process.env.JWT_SECRET);
        req.user = { username, userid }; // Attach user info to the request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ msg: "Authentication is invalid", error: error.message });
    }
}
module.exports = authMiddleware;
