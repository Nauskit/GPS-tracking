const User = require('../models/user')
const bcrypt = require('bcrypt')
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt')
require('dotenv').config();

const SALT_ROUNDS = 10;


exports.register = async (req, res) => {
    const { email, username, password } = req.body
    if (!email || !username || !password) {
        return res.status(400).json({ message: "All fields are required!" })
    }
    try {
        const exitingUser = await User.findOne({ username })
        if (exitingUser) {
            return res.status(401).json({ message: "Username already in use!" })
        }
        const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const createUser = await User.create({ email, password: hashPassword, username })

        return res.status(201).json({ message: "Register successfully" })

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error: ", err })
    }

}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    try {
        const loginUser = await User.findOne({ email });
        if (!loginUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, loginUser.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Password" })
        }
        const accessToken = generateAccessToken(loginUser);
        const refreshToken = generateRefreshToken(loginUser);

        loginUser.refreshToken = refreshToken;
        await loginUser.save();

        return res.status(200).json({
            message: "Login Ssuccessfully",
            role: loginUser.role,
            accessToken,
            refreshToken,
            username: loginUser.username
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error: ", err })
    }
}