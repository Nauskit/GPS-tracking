const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config();


const verifyToken = (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer", "").trim();

    if (!token) {
        return res.status(401).json({ message: "Access token is required" })
    }
    try {


        const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET)
        req.user = decoded
        next();

    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired!" })
        }
        return res.status(500).json({ message: "Invalid Token" });
    }
}

module.exports = verifyToken;