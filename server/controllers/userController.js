const User = require("../models/User")
const bcrypt= require('bcrypt')
const createNewUser = async (req, res) => {
    const { userName, password, name, phone, email} = req.body
    console.log(userName, password, name, phone, email);

    if (!userName || !password) {
        return res.status(400).send('userName and password are required')
    }
    const duplicate = await User.findOne({ userName: userName }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
    }
    const user = await User.create({ userName, password:await bcrypt.hash(password, 10), name, phone, email })
    if (user){
        return  user
         }
    return res.status(400).send('user not created')
}

const getAllUsers = async (req, res) => {
    const users = await User.find({}, { password: 0, userName: 0 }).lean()
    if (!users?.length)
        return res.status(400).send("No users found")
    return res.json(users)
}

const getUserById = async (req, res) => {
    const { userId } = req.params
    const user = await User.findById(userId).lean()
    if (!user) {
        return res.status(400).send("User does not exist.")
    }
    res.json(user)
}

const updateUser = async (req, res) => {
    const { userId, name, phone, email,role } = req.body
    if (!userId) {

        return res.status(400).send("userId is requried")
    }
    const user = await User.findById(userId).exec()
    if (!user) {
        return res.status(400).send("User does not exist.")
    }
    if(role)
    user.role=role
    user.name = name
    user.email = email
    user.phone = phone
    console.log("!!!!!!!!!!!!!!!!!");
    console.log(user);
    const updatedUser = await user.save() 
    console.log("!!!!!!!!!!!!!!!!!");
    console.log(updatedUser);
    return updatedUser

}

const updatePassword = async (req, res)=>{
    const { password, oldpassword ,userId} = req.body
    if (!password || !oldpassword)
        return res.status(400).send("password is requried")
    const user = await User.findById(userId).exec()
    const match = await bcrypt.compare(oldpassword, user.password)
    if(!match)
        res.status(401).send("Unauthorized")
    user.password=await bcrypt.hash(password, 10)
    await user.save()
    return user
}

const deleteUser = async (req, res) => {
    const { userId } = req.params
    const user = await User.findById(userId).exec()
    if (!user) {
        return res.status(400).send("User does not exist.")
    }
    const result = await user.deleteOne()
    return res.status(204)

}

module.exports = { createNewUser, getAllUsers, getUserById, updateUser, deleteUser,updatePassword }