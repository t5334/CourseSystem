
import React, { useRef, useState } from 'react';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import StudentRegistration from './StudentRegistration';
import { Dialog } from 'primereact/dialog';
import axios from 'axios'
import Courses from './Courses'
import { useDispatch, useSelector } from 'react-redux';
import { setToken, logOut } from '../redux/tokenSlice'
import { useNavigate } from 'react-router-dom';
import TeacherRegistration from './TeacherRegistartion'
import './LoginDemo.css';


export default function LoginDemo() {
    const Inputusername = useRef(null)
    const Inputpassword = useRef(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
   // const [info, setInfo] = useState({})
    const [showStudentRegister, setShowStudentRegister] = useState(false);
    const [showTeacherRegister, setShowTeacherRegister] = useState(false);

    //למחוק את מה שיש במשתנה הגלובלי 
    const Login = async () => {

            const user = {
                userName: Inputusername.current.value,
                password: Inputpassword.current.value
            }

        try {
            const res = await axios.post('http://localhost:7000/api/auth/login', user)
            let userInfo = { ...res.data.user };
           await dispatch(setToken({ token: res.data.accessToken }))
            console.log("login"+res.data);
            switch (res.data.user.role) {
                case "Student":
                    console.log("student");
                    try {
                        if (!res.data.user || !res.data.user._id) {
                            console.error("User ID is not defined");
                            return;
                        }
                        const resStudent = await axios.get(`http://localhost:7000/api/students/user/${res.data.user._id}`, {
                            headers: { Authorization: `Bearer ${ res.data.accessToken }` },
                        });

                        if (res.status === 200) {
                            console.log("Student data fetched successfully:", resStudent.data);
                            userInfo = { ...userInfo, studentId: resStudent.data._id, class: resStudent.data.yearbook, classNumber: resStudent.data.numClass };
                        } else {
                            console.error("Failed to fetch student data. Status:", res.status);
                        }
                    } catch (error) {
                        console.error("Error fetching student data:", error.response ? error.response.data : error.message);
                    }
                    break;
                case "Teacher":
                    console.log("teacher");
                    try {
                        if (!res.data.user || !res.data.user._id) {
                            console.error("User ID is not defined");
                            return;
                        }

                        const resTeacher = await axios.get(`http://localhost:7000/api/teachers/user/${res.data.user._id}`, {
                            headers: { Authorization: `Bearer ${ res.data.accessToken }` },
                        });

                        if (res.status === 200) {
                            console.log("Teacher data fetched successfully:", res.data);
                            userInfo = { ...userInfo, teacherId: resTeacher.data._id, bank: resTeacher.data.account.bank, accountNumber: resTeacher.data.account.acccount, accountHolder: resTeacher.data.account.holder };                        } else {
                            console.error("Failed to fetch teacher data. Status:", res.status);
                        }
                    } catch (error) {
                        console.error("Error fetching teacher data:", error.response ? error.response.data : error.message);
                    }
                    break;
                default:
                    console.log("admin");
            }
            // if (res.data.user.role === "Student" && res.status === 200) {
            //     setInfo(() => ({
            //         studentId: res.data._id,
            //         class: res.data.yearbook,
            //         classNumber: res.data.numClass,
            //     }));
            // } else if (res.data.user.role === "Teacher" && res.status === 200) {
            //     setInfo(() => ({
            //         teacherId: res.data._id,
            //         bank: res.data.bank,
            //         accountNumber: res.data.accountNumber,
            //         accountHolder: res.data.accountHolder,
            //     }));
            // }
            console.log("login");
            console.log(res);
            console.log(res.data.user);
            console.log(res.data.accessToken);
            dispatch(setToken({ token: res.data.accessToken, user: userInfo }));
            console.log(userInfo);
            //dispatch(setToken({ token: res.data.accessToken, user: { ...userData } }));
            navigate('/courses');
        }
        catch (e) {
            console.log(e);
            alert("הכניסה נכשלה")
        }

        // const user = {
        //     userName: Inputusername.current.value,
        //     password: Inputpassword.current.value
        // }
        // try {
        //     const res = await axios.post('http://localhost:7000/api/auth/login', user, { headers: { Authorization: `Bearer ${token}` } })
        //     console.log("login");
        //     console.log(res);
        //     //לתפוס את התוקן
        //     console.log(res.data.user);
        //     console.log(res.data.accessToken);
        //     dispatch(setToken({ token: res.data.accessToken, user: res.data.user }))

        //     navigate('/courses');
        // }
        // catch (e) {
        //     console.log(e);
        // }
    }
   
    const openStudentDialog = () => {
        setShowStudentRegister(true);
    };

    const closeStudentDialog = () => {
        setShowStudentRegister(false);
    };

    const openTeacherDialog = () => {
        setShowTeacherRegister(true);
    };

    const closeTeacherDialog = () => {
        setShowTeacherRegister(false);
    };
    // return (
    //     <div className="card">
    //         <div className="flex flex-column md:flex-row">
    //             <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
    //                 <div className="flex flex-wrap justify-content-center align-items-center gap-2">
    //                     <label className="w-6rem">שם משתמש:</label>
    //                     <InputText ref={Inputusername} id="username" type="text" className="w-12rem" required />
    //                 </div>
    //                 <div className="flex flex-wrap justify-content-center align-items-center gap-2">
    //                     <label className="w-6rem">סיסמא:</label>
    //                     <InputText ref={Inputpassword} id="password" type="password" className="w-12rem" required />
    //                 </div>
    //                 <Button label="כניסה" icon="pi pi-user" className="w-10rem mx-auto" onClick={Login}></Button>
    //             </div>
    //             <div className="w-full md:w-2">
    //                 <Divider layout="vertical" className="hidden md:flex">
    //                     <b>או</b>
    //                 </Divider>
    //                 {/* <Divider layout="horizontal" className="flex md:hidden" align="center">
    //                     <b>OR</b>
    //                 </Divider> */}
    //             </div>
    //             <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
    //                 <Button label="רישום תלמידה" icon="pi pi-user-plus" severity="success" className="w-12rem" onClick={openStudentDialog}></Button>
    //                 <div className="w-full d-flex justify-content-center mt-2">
    //                     <Button
    //                         label="רישום למורה"
    //                         onClick={openTeacherDialog}
    //                         className="w-10rem"
    //                         icon="pi pi-user-plus"
    //                     //severity="success"
    //                     />
    //                 </div>
    //             </div>
    //         </div>
    //         <Dialog
    //             header="Register Student"
    //             visible={showStudentRegister}
    //             modal
    //             onHide={closeStudentDialog}
    //             style={{ width: '30vw', height: "30vw" }}
    //             breakpoints={{ '960px': '75vw', '641px': '100vw' }}
    //         >
    //             <StudentRegistration closeDialog={closeStudentDialog} visible={showStudentRegister} />
    //         </Dialog>
    //         <Dialog
    //             header="Register Teacher"
    //             visible={showTeacherRegister}
    //             modal
    //             onHide={closeTeacherDialog}
    //             style={{ width: '30vw', height: "30vw" }}
    //             breakpoints={{ '960px': '75vw', '641px': '100vw' }}
    //         >
    //             <TeacherRegistration closeDialog={closeTeacherDialog} visible={showTeacherRegister} />
    //         </Dialog>
    //     </div>
    // )

    return (
        <div id='login' className="card">
             <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333', fontSize: '24px' }}>
            ברוך הבא למערכת החוגים
        </h1>
            <div className="flex flex-column md:flex-row">
                {/* Left Side: Username and Password Inputs */}
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">שם משתמש:</label>
                        <InputText ref={Inputusername} id="username" type="text" className="w-12rem" required />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">סיסמא:</label>
                        <InputText ref={Inputpassword} id="password" type="password" className="w-12rem" required />
                    </div>
                    <Button label="כניסה" icon="pi pi-user" className="w-10rem mx-auto" onClick={Login}></Button>
                </div>
    
                {/* Divider Area */}
                {/* <div className="w-full md:w-2">
                    <Divider layout="vertical" className="hidden md:flex">
                        <b>או</b>
                    </Divider>
                </div> */}
    
                {/* Right Side: Register Buttons */}
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5 flex-column">
                    <Button label="רישום תלמידה" icon="pi pi-user-plus" severity="success" className="w-12rem mb-2" onClick={openStudentDialog}></Button>
                    <Button
                        label="רישום למורה"
                        onClick={openTeacherDialog}
                        className="w-10rem"
                        icon="pi pi-user-plus"
                    />
                </div>
            </div>
    
            {/* Dialogs for Registration */}
            <Dialog
                header="Register Student"
                visible={showStudentRegister}
                modal
                onHide={closeStudentDialog}
                style={{ width: '30vw', height: "30vw" }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            >
                <StudentRegistration closeDialog={closeStudentDialog} visible={showStudentRegister} />
            </Dialog>
    
            <Dialog
                header="Register Teacher"
                visible={showTeacherRegister}
                modal
                onHide={closeTeacherDialog}
                style={{ width: '30vw', height: "30vw" }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            >
                <TeacherRegistration closeDialog={closeTeacherDialog} visible={showTeacherRegister} />
            </Dialog>
        </div>
    );
}
