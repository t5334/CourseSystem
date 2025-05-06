import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const PaymentUpdateDialog = ({ visible, onHide, student, course }) => {
    const [amount, setAmount] = useState('');
    const [discount, setDiscount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const paymentMethods = [
        { label: 'כרטיס אשראי', value: 'Credit Card' },
        { label: "צ'ק", value: "Check" },
        { label: 'העברה בנקאית', value: 'Bank Transfer' },
        { label: 'הוראת קבע', value: "Standing order" },
        { label: 'מזומן', value: "Cash" },
    ];

    const handleSubmit = async () => {
        // Handle the payment submission logic here
        console.log("Payment details", { amount, discount, paymentMethod, studentId: student._id, courseId: course._id });

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
                <label htmlFor="amount">סכום לתשלום:</label>
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