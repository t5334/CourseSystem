
import React, { useState ,useEffect} from 'react';
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



const RegistrationForm = () => {
    const [courseName, setCourseName] = useState('');
    const [studentName, setStudentName] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');
    const [datacourses, setdatacourses] = useState([])
    const [course, setCourse] = useState(null)
    const {token} = useSelector((state) => state.token);
    const navigate=useNavigate();
    const getcourses = async () => {
        try {
            const res = await axios.get('http://localhost:7000/api/course', {headers:{Authorization:`Bearer ${token}`}})
            if (res.status === 200) {
                console.log(res.data);
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

    const handleSubmit = async(e) => {
        const courseId=course._id
        const payments={amount,way:paymentMethod,date:new Date().toLocaleDateString()}
        e.preventDefault();
        const registrationData = {
            courseId,
            studentName,//studentId
            payments,
            remark:specialNotes
        };
        console.log("Registration Data Submitted: ", registrationData);
        try{
navigate('/courses');
        }
        catch(e){
            console.error(e)
        }

    };
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
                    value={course}
                    options={datacourses}
                    onChange={(e) => {
                        setCourse(e.value);
                        console.log(e.value);
                        console.log(course);
                        setCourseName(e.value)
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