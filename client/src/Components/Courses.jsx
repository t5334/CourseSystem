

import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import Course from "./Course";
import { Toast } from "primereact/toast"; // For notifications
export default function Courses() {
    const [data, setData] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [visibleCreate, setVisibleCreate] = useState(false);
    const inputName = useRef(null);
    const inputDescription = useRef(null);
    const inputPrice = useRef(null);
    const inputDomain = useRef(null);
    const inputMinClass = useRef(null);
    const inputMaxClass = useRef(null);
    const toast = useRef(null); // For notifications

    const add = async () => {
        if (!inputName.current.value.trim()) {
            toast.current.show({
                severity: "error",
                summary: "Validation Error",
                detail: "Course name is required.",
                life: 3000,
            });
            return;
        }
    
        if (!selectedTeacher) {
            toast.current.show({
                severity: "error",
                summary: "Validation Error",
                detail: "Please select a teacher.",
                life: 3000,
            });
            return;
        }
        

        const newCourse = {
            name: inputName.current.value,
            description: inputDescription.current.value,
            price: inputPrice.current.value,
            domain: inputDomain.current.value,
            minClass: inputMinClass.current.value,
            maxClass: inputMaxClass.current.value,
            teacherId: selectedTeacher.id // Use the selected teacher's ID
        };

        try {
            const res = await axios.post('http://localhost:7000/api/course', newCourse);
            setData((prevData) => [...prevData, res.data]);
            setVisibleCreate(false);
            // Clear the selected teacher after successful creation
            setSelectedTeacher(null);
        } catch (error) {
            console.log(error);
        }
    };

    const footerContent = (
        <div>
            <Button label="Close" icon="pi pi-times" onClick={() => setVisibleCreate(false)} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={() => add()} autoFocus />
        </div>
    );

    const getCourses = async () => {
        try {
            const res = await axios.get('http://localhost:7000/api/course');
            if (res.status === 200) {
                setData(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const getTeachers = async () => {
        try {
            const res = await axios.get('http://localhost:7000/api/teachers');
            if (res.status === 200) {
                setTeachers(res.data); // Set the list of teachers
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getTeachers();
        getCourses();

    }, []);

    return (
        <>
            <h1>חוגי בית יעקב</h1>
            <Button tooltip="הוסף" rounded aria-label="Filter" icon="pi pi-plus" onClick={() => setVisibleCreate(true)}></Button>
            {/* <Button style={{
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        zIndex: 1000, // Ensure the button is above other elements
    }} onClick={() => setVisibleCreate(true)} /> */}
            <Dialog header="Create new course" visible={visibleCreate} style={{ width: '50vw' }} onHide={() => setVisibleCreate(false)} footer={footerContent}>
                <div className="field grid">
                    <label htmlFor="name" className="col-12 mb-2 md:col-2 md:mb-0">שם:</label>
                    <div className="col-12 md:col-10">
                        <InputText ref={inputName} type='text' /><br />
                    </div>
                </div>
                <div className="field grid">
                    <label htmlFor="Description" className="col-12 mb-2 md:col-2 md:mb-0">תאור:</label>
                    <div className="col-12 md:col-10">
                        <InputText ref={inputDescription} type='text' /><br />
                    </div>
                </div>
                <div className="field grid">
                    <label htmlFor="TecherName" className="col-12 mb-2 md:col-2 md:mb-0">מורה:</label>
                    <div className="col-12 md:col-10">
                        <Dropdown
                            value={selectedTeacher}
                            options={teachers}
                            onChange={(e) => setSelectedTeacher(e.value)}
                            optionLabel="userId.name"
                            placeholder="Select a teacher"
                        /><br />
                    </div>
                </div>
                <div className="field grid">
                    <label htmlFor="Price" className="col-12 mb-2 md:col-2 md:mb-0">מחיר:</label>
                    <div className="col-12 md:col-10">
                        <InputText ref={inputPrice} type='text' /><br />
                    </div>
                </div>
                <div className="field grid">
                    <label htmlFor="Domain" className="col-12 mb-2 md:col-2 md:mb-0">תחום:</label>
                    <div className="col-12 md:col-10">
                        <InputText ref={inputDomain} type='text' /><br />
                    </div>
                </div>
                <div className="field grid">
                    <label htmlFor="MinClass" className="col-12 mb-2 md:col-2 md:mb-0">מכיתה:</label>
                    <div className="col-12 md:col-10">
                        <InputText ref={inputMinClass} type='text' /><br />
                    </div>
                </div>
                <div className="field grid">
                    <label htmlFor="MaxClass" className="col-12 mb-2 md:col-2 md:mb-0">עד כיתה:</label>
                    <div className="col-12 md:col-10">
                        <InputText ref={inputMaxClass} type='text' /><br />
                    </div>
                </div>
            </Dialog>

            <div class="grid">
                {data.map((item) => { return <Course setCourses={setData} teachers={teachers} setTeachers={setTeachers} course={item} role={"student"} /> })}
                    </div>
        </>
    );
}