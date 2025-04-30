// //רישום לקורס
// import React, { useState } from 'react';
// import 'primereact/resources/themes/saga-blue/theme.css'; // Choose your theme
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import { InputText } from 'primereact/inputtext';
// import { Dropdown } from 'primereact/dropdown';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { Button } from 'primereact/button';

// const CourseRegistration = () => {
//     const [courseName, setCourseName] = useState('');
//     const [studentName, setStudentName] = useState('');
//     const [amount, setAmount] = useState('');
//     const [paymentMethod, setPaymentMethod] = useState('');
//     const [specialNotes, setSpecialNotes] = useState('');

//     const paymentMethods = [
//         { label: 'Credit Card', value: 'creditCard' },
//         { label: 'PayPal', value: 'paypal' },
//         { label: 'Bank Transfer', value: 'bankTransfer' }
//     ];

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const registrationData = {
//             courseName,
//             studentName,
//             amount,
//             paymentMethod,
//             specialNotes
//         };
//         console.log("Registration Data Submitted: ", registrationData);
//         // Here you can handle the registration logic (e.g. sending data to the server)
//     };

//     return (
//         <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
//             <h2>Course Registration Form</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="p-field">
//                     <label htmlFor="courseName">Course Name</label>
//                     <InputText id="courseName" value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
//                 </div>
//                 <div className="p-field">
//                     <label htmlFor="studentName">Student Name</label>
//                     <InputText id="studentName" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
//                 </div>
//                 <div className="p-field">
//                     <label htmlFor="amount">Amount to Pay</label>
//                     <InputText id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
//                 </div>
//                 <div className="p-field">
//                     <label htmlFor="paymentMethod">Payment Method</label>
//                     <Dropdown id="paymentMethod" value={paymentMethod} options={paymentMethods} onChange={(e) => setPaymentMethod(e.value)} placeholder="Select a payment method" />
//                 </div>
//                 <div className="p-field">
//                     <label htmlFor="specialNotes">Special Notes</label>
//                     <InputTextarea id="specialNotes" value={specialNotes} onChange={(e) => setSpecialNotes(e.target.value)} rows={5} />
//                 </div>
//                 <Button type="submit" label="Register" icon="pi pi-check" />
//             </form>
//         </div>
//     );
// };

// export default CourseRegistration;
import React, { useState } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'; // Choose your theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import './RegistrationForm.css';

const RegistrationForm = () => {
    const [courseName, setCourseName] = useState('');
    const [studentName, setStudentName] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');

    const paymentMethods = [
        { label: 'כרטיס אשראי', value: 'Credit Card' },
        { label: "צ'ק", value: "Check" },
        { label: 'העברה בנקאית', value: 'bankTransfer' },
        { label: 'הוראת קבע', value: "Standing order" },
        { label: 'מזומן', value: "Cash" },

    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const registrationData = {
            courseName,
            studentName,
            amount,
            paymentMethod,
            specialNotes
        };
        console.log("Registration Data Submitted: ", registrationData);
    };

    return (
        <div className="registration-form">
            <h2>טופס רישום לקורס</h2>
            <form onSubmit={handleSubmit}>
                <div className="p-field">
                    <label htmlFor="courseName">שם הקורס</label>
                    <Dropdown
                    value={course}
                    options={datacourses}
                    onChange={(e) => {
                        setCourse(e.value);
                        console.log(e.value);
                        console.log(course);
                        //getlessons();
                    }}
                    optionLabel="name"
                    placeholder="Select a course"
                />
                </div>
                <div className="p-field">
                    <label htmlFor="studentName">שם התלמיד</label>
                    <InputText id="studentName" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
                </div>
                <div className="p-field">
                    <label htmlFor="amount">סכום לתשלום</label>
                    <InputText id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>
                <div className="p-field">
                    <label htmlFor="paymentMethod">שיטת תשלום</label>
                    <Dropdown id="paymentMethod" value={paymentMethod} options={paymentMethods} onChange={(e) => setPaymentMethod(e.value)} placeholder="בחר שיטת תשלום" />
                </div>
                <div className="p-field">
                    <label htmlFor="specialNotes">הערות מיוחדות</label>
                    <InputTextarea id="specialNotes" value={specialNotes} onChange={(e) => setSpecialNotes(e.target.value)} rows={5} />
                </div>
                <Button type="submit" label="רשום" icon="pi pi-check" />
            </form>
        </div>
    );
};

export default RegistrationForm;