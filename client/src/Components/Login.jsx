
import React, { useRef, useState } from 'react';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import StudentRegistration from './StudentRegistration';
import { Dialog } from 'primereact/dialog';
import axios from 'axios'
import Courses from './Courses'
import { useNavigate } from 'react-router-dom';
import TeacherRegistration from './TeacherRegistartion'
export default function LoginDemo() {
    const Inputusername = useRef(null)
    const Inputpassword = useRef(null)
    const navigate = useNavigate();
    //למחוק את מה שיש במשתנה הגלובלי 
    const login = async () => {

        const user = {
            userName: Inputusername.current.value,
            password: Inputpassword.current.value
        }
        try {
            const res = await axios.post('http://localhost:7000/api/auth/login', user)
            console.log("login");
            console.log(res);
            //לתפוס את התוקן
            navigate('layout/courses');
        }
        catch (e) {
            console.log(e);
        }
    }



    const [showRegister, setShowRegister] = useState(false);

    const handleRegisterClick = () => {
        setShowRegister(true);
    };
    const [visible, setVisible] = useState(false);

    const openDialog = () => {
        setVisible(true);
    };

    const closeDialog = () => {
        setVisible(false);
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
                    <Button label="רישום תלמידה" icon="pi pi-user-plus" severity="success" className="w-12rem" onClick={() => {
                        handleRegisterClick();
                        openDialog();
                    }}></Button>
                    <div className="w-full d-flex justify-content-center mt-2">
                        <Button
                            label="רישום למורה"
                            onClick={() => {
                                handleRegisterClick();
                                openDialog();
                            }}
                            className="w-10rem"
                            icon="pi pi-user-plus"
                        //severity="success"
                        />
                    </div>
                </div>
            </div>
            <Dialog
                header="Register"
                visible={visible}
                modal
                onHide={closeDialog}
                style={{ width: '30vw', height: "30vw" }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            >
                <StudentRegistration closeDialog={closeDialog} visible={visible} />
            </Dialog>
            <Dialog
                header="Register"
                visible={visible}
                modal
                onHide={closeDialog}
                style={{ width: '30vw', height: "30vw" }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <TeacherRegistration closeDialog={closeDialog} visible={visible} />
            </Dialog>
        </div>
    )
}
