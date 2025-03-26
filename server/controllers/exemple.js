
/*

לטפל ב:

קבלה על פי חוב
על פי טלפון
קבלה רק של התואמים למשתמש 

*/







const mongoose = require('mongoose');

// Define your schemas
const paymentSchema = new mongoose.Schema({ amount: Number });
const registrationSchema = new mongoose.Schema({
    course: String,
    payments: [paymentSchema]
});

const Registration = mongoose.model('Registration', registrationSchema);

// Function to get students with debts
async function getStudentsWithDebts(classCost) {
    try {
        const studentsWithDebts = await Registration.aggregate([
            {
                $project: {
                    courseCode: 1,
                    totalPayments: { $sum: "$payments.amount" },
                    classCost: classCost
                }
            },
            {
                $match: {
                    $expr: { $lt: ["$totalPayments", "$classCost"] }
                }
            }
        ]);

        return studentsWithDebts;
    } catch (error) {
        console.error(error);
    }
}

// Usage example
const classCost = 1000; // replace with actual class cost
getStudentsWithDebts(classCost).then(debts => {
    console.log(debts);
});