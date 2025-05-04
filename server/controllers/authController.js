const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {

    const { userName, password } = req.body

    if (!userName || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const foundUser = await User.findOne({ userName }).lean()
    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match)
        return res.status(401).json({ message: 'Unauthorized' })
console.log(foundUser);
    const userInfo = {
        _id: foundUser._id,
        name: foundUser.name,
        role: foundUser.role,
        userName: foundUser.userName,
        email: foundUser.email,
        phone:foundUser.phone
    }
    const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken,user:userInfo})
}

const register = async (req, res) => {
    const { userName, password, name, email, phone } = req.body
    if (!name || !userName || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const duplicate = await User.findOne({ userName }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate userName" })
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { name, email, userName, phone, password: hashedPwd }
    const user = await User.create(userObject)
    if (user) {
        return res.status(201).json({
            message: `New user ${user.userName} created`
        })
    } else {
        return res.status(400).json({ message: 'Invalid user received' })
    }
}

module.exports = { login, register }




