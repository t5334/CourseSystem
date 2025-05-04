
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






export default function LoginDemo() {
    const Inputusername = useRef(null)
    const Inputpassword = useRef(null)
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.token);
    const navigate = useNavigate();
    //למחוק את מה שיש במשתנה הגלובלי 
    const login = async () => {

        const user = {
            userName: Inputusername.current.value,
            password: Inputpassword.current.value
        }
        try {
            const res = await axios.post('http://localhost:7000/api/auth/login', user,{headers:{Authorization:`Bearer ${token}`}})
            console.log("login");
            console.log(res);
            //לתפוס את התוקן
            dispatch(setToken({token:res.data.accessToken,user:res.data.user}))

            navigate('/courses');
        }
        catch (e) {
            console.log(e);
        }
    }
    const [showStudentRegister, setShowStudentRegister] = useState(false);
    const [showTeacherRegister, setShowTeacherRegister] = useState(false);

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
    return (
        <div className="card">
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">שם משתמש:</label>
                        <InputText ref={Inputusername} id="username" type="text" className="w-12rem" required />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">סיסמא:</label>
                        <InputText ref={Inputpassword} id="password" type="password" className="w-12rem" required />
                    </div>
                    <Button label="כניסה" icon="pi pi-user" className="w-10rem mx-auto" onClick={login}></Button>
                </div>
                <div className="w-full md:w-2">
                    <Divider layout="vertical" className="hidden md:flex">
                        <b>או</b>
                    </Divider>
                    <Divider layout="horizontal" className="flex md:hidden" align="center">
                        <b>OR</b>
                    </Divider>
                </div>
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    <Button label="רישום תלמידה" icon="pi pi-user-plus" severity="success" className="w-12rem" onClick={openStudentDialog}></Button>
                    <div className="w-full d-flex justify-content-center mt-2">
                        <Button
                            label="רישום למורה"
                            onClick={openTeacherDialog}  
                            className="w-10rem"
                            icon="pi pi-user-plus"
                        //severity="success"
                        />
                    </div>
                </div>
            </div>
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
    )
}
