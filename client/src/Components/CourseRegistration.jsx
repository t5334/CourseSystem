

import React, { useState, useEffect } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'; // Choose your theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import './RegistrationForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



const RegistrationForm = (props) => {
    const [courseName, setCourseName] = useState('');
    const [student, setStudent] = useState({});
    const [amount, setAmount] = useState(''); // Initialize as an empty string
    const [paymentMethod, setPaymentMethod] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');
    const [datacourses, setdatacourses] = useState([])
    const [course, setCourse] = useState(props.course || null)
    const { token, user } = useSelector((state) => state.token);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const getcourses = async () => {
        try {
            const res = await axios.get('http://localhost:7000/api/course', { headers: { Authorization: `Bearer ${token}` } })
            if (res.status === 200) {
                // console.log(res.data);
                setdatacourses(res.data)
            }
        } catch (e) {
            console.error(e)
        }
    }


    const paymentMethods = [
        { label: 'כרטיס אשראי', value: 'Credit Card' },
        { label: "צ'ק", value: "Check" },
        { label: 'העברה בנקאית', value: 'bankTransfer' },
        { label: 'הוראת קבע', value: "Standing order" },
        { label: 'מזומן', value: "Cash" },

    ];
    const handleCourseChange = (e) => {
        setCourse(e.value);
        setCourseName(e.value);
        if (e.value) {
            setAmount(e.value.price); // Automatically set the amount when a course is selected
        } else {
            setAmount(''); // Reset the amount if no course is selected
        }
    };
    const handleSubmit = async (e) => {
        console.log("Submitting registration form with course:", course);
        setLoading(true);
        const courseId = course._id
        try {
            console.log('Course ID:', courseId);
            const newStudent = await axios.get(`http://localhost:7000/api/students/user/${student._id}`, { headers: { Authorization: `Bearer ${token}` } })             //   console.log(newStudent);


        } catch (error) {
            console.error("Error fetching student data:", error);
        }
        const payments = { amount, way: paymentMethod, date: new Date().toLocaleDateString() }
        e.preventDefault();
        const registrationData = {
            courseId,
            studentId: student._id,
            //  payments,
            remarks: specialNotes
        };
        console.log("Registration Data Submitted: ", registrationData);
        try {

            const response = await axios.post('http://localhost:7000/api/register', registrationData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 201) { // Assuming 201 is the success status
                console.log("Registration successful:", response.data);
             
                navigate('/courses'); // Redirect after successful registration 
                alert("הרשמה בוצעה בהצלחה");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            // You can add additional error handling or notifications here
        } finally {
            setLoading(false);
        }


    };
    useEffect(() => {
        if (user && user.name) {
            setStudent(user); // Set student name based on user name
        }
    }, [user]);
    useEffect(() => {
        getcourses()
    }, [])
    return (
        <div className="registration-form">
            <h2>טופס רישום לקורס</h2>
            <form onSubmit={handleSubmit}>
                <div className="p-field">
                    <label htmlFor="courseName">שם הקורס</label>
                    <Dropdown
                        style={{ width: '100%' }}
                        value={course}
                        options={datacourses}
                        onChange={(e) => {
                            handleCourseChange(e);
                            // setCourse(e.value);
                            // console.log(e.value);
                            // console.log(course);
                            // setCourseName(e.value)
                            // //getlessons();
                        }}
                        optionLabel="name"
                        placeholder="Select a course"
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="studentName">שם התלמיד</label>
                    <InputText style={{ width: '100%' }} id="studentName" value={student.name || ''} readOnly />
                </div>
                <div className="p-field">
                    <label htmlFor="amount">סכום לתשלום</label>
                    <InputText style={{ width: '100%' }} id="amount" value={amount} required readOnly />
                </div>
                {/* <div className="p-field">
                    <label htmlFor="paymentMethod">שיטת תשלום</label>
                    <Dropdown style={{ width: '100%' }} id="paymentMethod" value={paymentMethod} options={paymentMethods} onChange={(e) => setPaymentMethod(e.value)} placeholder="בחר שיטת תשלום" />
                </div> */}
                <div className="p-field">
                    <label htmlFor="specialNotes">הערות מיוחדות</label>
                    <InputTextarea style={{ width: '100%' }} id="specialNotes" value={specialNotes} onChange={(e) => setSpecialNotes(e.target.value)} rows={5} />
                </div>
                <Button style={{ width: '100%' }} type="submit" label={loading ? " אנא המתן..." : "רשום"} icon="pi pi-check" disabled={loading} />
            </form>
        </div>
    );
};

export default RegistrationForm;