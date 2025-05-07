const Register = require("../models/Register")
const User = require("../models/User"); 

const createNewRegister = async (req, res) => {
    const { courseId, studentId, remarks } = req.body
    if (!courseId || !studentId) {
        return res.status(400).send('CourseId and studentId are required')
    }
    const register = await Register.create({ courseId, studentId, remarks })
    if (register)
        return res.status(201).json(register)
    return res.status(400).send('The registration was not created.')
}

const getAllRegisters = async (req, res) => {
    const registers = await Register.find().populate(["courseId", "studentId"]).lean()
    if (!registers?.length)
        return res.status(400).send("Registration not found")
    return res.json(registers)
}

const getRegisterById = async (req, res) => {
    const { registerId } = req.params
    const register = await Register.findById(registerId).populate(["courseId", "studentId"]).lean()
    if (!register) {
        return res.status(400).send("Registration not found")
    }
    res.json(register)
}
// const getRegistersByPhone = async (req, res) => {
//     const { phone } = req.params
//     const registers = await Register.find().populate({
//         path: 'studentId',
//         populate: {
//             path: 'userId',
//             model: 'User' // Ensure this matches the correct model name for User
//         }
//     }).lean()
//     if (!registers?.length) {
//         return res.status(400).send("Registration not found")
//     }
//     res.json(registers)
// }

const getRegistersByPhone = async (req, res) => {
    const { phone } = req.params;

        // Find the users with the specified phone number
        const users = await User.find({ phone }).lean();

        // Check if any users were found
        if (!users.length) {
            return res.status(404).send("No users found with this phone number.");
        }

        // Extract user IDs
        const userIds = users.map(user => user._id);

        // Find registers that are associated with these user IDs
        const registers = await Register.find()
            .populate({
                path: 'studentId',
                match: { userId: { $in: userIds } } // Filter students by userId
            })
            .lean();

        // Filter out any registers that have no matching students
        const filteredRegisters = registers.filter(register => register.studentId);

        // Check if any registers were found
        if (!filteredRegisters.length) {
            return res.status(404).send("No registrations found for this phone number.");
        }

        return res.json(filteredRegisters);
  
}

const getRegisterByCourse = async (req, res) => {
    const { courseId } = req.params
    const registers = await Register.find({courseId}).populate(["courseId", "studentId"]).lean()
    if (!registers?.length) {
        return res.status(400).send("Registration not found")
    }
    res.json(registers)
}
const getRegisterByDebt = async (req, res) => {
    const registers = await Register.find() .populate({ path: "courseId" })
    .populate({ path: "studentId", populate: { path: "userId" } }).lean()
    const needToPay= registers.filter((item)=>{
        let p=item.courseId.price-item.discount
       let sum=0;
       item.payments.map(element => {
            sum+= element.amount;
        });
        console.log(sum);
        if(p-sum>0){
            item.debt=p-sum;
            return item;
        } 
    })
    if (!needToPay?.length)
        return res.status(400).send("Registration not found")
    return res.json(needToPay)
}
const getRegisterByStudent = async (req, res) => {
    const { studentId } = req.params
    const registers = await Register.find({studentId}).populate(["courseId", "studentId"]).lean()
    if (!registers?.length) {
        return res.status(400).send("Registration not found")
    }
    res.json(registers)
}


const updateRegister = async (req, res) => {
    const { registerId, discount, amount, way, remarks } = req.body
    if (!registerId) {
        return res.status(400).send("RegisterId is requried")
    }
    const register = await Register.findById(registerId).exec()
    if (!register) {
        return res.status(400).send("Registration not found")
    }
   
    if (remarks)
        register.remarks = register.remarks + "/n" + remarks
    if (discount) {
        register.discount = discount
    }

    register.payments.push({ amount, way, date:new Date().toISOString() });
    const updatedRegister = await register.save()

    return res.json(updatedRegister).status(200)

}

const deleteRegister = async (req, res) => {
    const { registerId } = req.params
    const register = await Register.findById(registerId).exec()
    if (!register) {
        return res.status(400).send("Registration not found")
    }
    const result = await register.deleteOne()
    return res.status(204)

}

module.exports = { createNewRegister, getAllRegisters, getRegisterById, updateRegister, deleteRegister,getRegisterByCourse ,getRegisterByStudent,getRegisterByDebt,getRegistersByPhone}