import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'; 

const PaymentUpdateDialog = ({ visible, onHide, student, course,registrationId }) => {
    const [amount, setAmount] = useState('');
    const [discount, setDiscount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const { token, user } = useSelector((state) => state.token);

    const paymentMethods = [
        { label: 'כרטיס אשראי', value: 'Credit Card' },
        { label: "צ'ק", value: "Check" },
        { label: 'העברה בנקאית', value: 'Bank Transfer' },
        { label: 'הוראת קבע', value: "Standing order" },
        { label: 'מזומן', value: "Cash" },
    ];

    const handleSubmit = async () => {
        // Handle the payment submission logic here
        try{
        console.log("Payment details", { amount, discount, way:paymentMethod, studentId: student._id, courseId: course._id,registerId:registrationId});
const updateData={
    amount, discount, way:paymentMethod,registerId:registrationId
}
        const response = await axios.put('http://localhost:7000/api/register', updateData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 201) { // Assuming 201 is the success status
            console.log("Registration successful:", response.data);

            //navigate('/courses'); // Redirect after successful registration 
            alert("הרשמה בוצעה בהצלחה");
        }
    } catch (error) {
        console.error("Error during registration:", error);
        // You can add additional error handling or notifications here
    } finally {
        //setLoading(false);
    }

    // Close dialog after submission
    onHide();
};

return (
    <Dialog header="עדכון תשלום" visible={visible} onHide={onHide}>
        <div className="p-field">
            <label htmlFor="studentName">שם התלמיד:</label>
            <InputText id="studentName" value={student.userId.name} readOnly />
        </div>
        <div className="p-field">
            <label htmlFor="courseName">שם הקורס:</label>
            <InputText id="courseName" value={course.courseId.name} readOnly />
        </div>
        <div className="p-field">
            <label htmlFor="amount">סכום ששולם:</label>
            <InputText id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="p-field">
            <label htmlFor="discount">הנחה:</label>
            <InputText id="discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        </div>
        <div className="p-field">
            <label htmlFor="paymentMethod">שיטת תשלום:</label>
            <Dropdown
                id="paymentMethod"
                value={paymentMethod}
                options={paymentMethods}
                onChange={(e) => setPaymentMethod(e.value)}
                placeholder="בחר שיטת תשלום"
            />
        </div>
        <Button label="שלח" onClick={handleSubmit} />
    </Dialog>
);
};

export default PaymentUpdateDialog;