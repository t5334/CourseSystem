import React, { useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import CourseRegistration from './CourseRegistration'; // Ensure you have a registration component for students
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';

export default function Course(props) {
    const { course, role, teachers,setCourses } = props
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [visibleDetails, setVisibleDetails] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedMinClass, setSelectedMinClass] = useState(null);
    const [selectedMaxClass, setSelectedMaxClass] = useState(null);
    const inputName = useRef(null);
    const inputDescription = useRef(null);
    const inputPrice = useRef(null);
    const inputDomain = useRef(null);
    const inputMinClass = useRef(null);
    const inputMaxClass = useRef(null);
    const inputTeacherName = useRef(null);

    const handleRegister = () => {
        // Handle registration logic here
        <CourseRegistration />;
    };

    const handleUpdate =async () => {
        const updatedCourse = {
            id: course._id,
            name: inputName.current?.value || course.name,
            description: inputDescription.current?.value,
            price: inputPrice.current?.value || course.price,
            teacherId: selectedTeacher?._id || course.teacherId?._id,
            minClass: selectedMinClass || course.minClass,
            maxClass: selectedMaxClass || course.maxClass,
        };

        try {
           
            const response = await axios.put(`http://localhost:7000/api/course`, updatedCourse, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Course updated successfully:', response.data);
            setVisibleUpdate(false); 
            alert('Course updated successfully!'); 
            setCourses((prevCourses) =>
                prevCourses.map((c) => (c._id === course._id ? response.data : c))
            );
        } catch (error) {
            console.error('Error updating course:', error.response?.data || error.message);
            alert('Failed to update course. Please try again.');
        }
    };

    const handleDelete = () => {
        // Delete logic here
    };

    const footerDelete = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisibleDelete(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={handleDelete} autoFocus />
        </div>
    );

    const footerContent = (
        <div>
            <Button label="Close" icon="pi pi-times" onClick={() => setVisibleUpdate(false)} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={handleUpdate} autoFocus />
        </div>
    );

    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );

    const footer = (
        <>
            {role === 'manager' && (
                <>
                    <Button severity="danger" icon="pi pi-trash" tooltip="מחק" tooltipOptions={{ position: 'bottom' }} onClick={() => setVisibleDelete(true)} />
                    <Button severity="info" icon="pi pi-pencil" tooltip="עדכן" tooltipOptions={{ position: 'bottom' }} onClick={() => setVisibleUpdate(true)} />
                    <Button severity="warning" icon="pi pi-ellipsis-h" tooltip="הצג פרטים" tooltipOptions={{ position: 'bottom' }} onClick={() => setVisibleDetails(true)} />

                </>
            )}
            {role === 'student' && (
                <Button severity="warning" label='Register' icon="pi pi-plus" onClick={handleRegister} />

            )}
        </>
    );


    return (

        <div className="col-12 md:col-6 lg:col-3">


            <div className="text-center p-3 border-round-sm bg-primary font-bold">
                <Card title={course.name} footer={footer} header={header} className="md:w-25rem">
                    <p>{course.description}</p>
                    <Dialog header={course.name} visible={visibleUpdate} style={{ width: '50vw' }} onHide={() => setVisibleUpdate(false)} footer={footerContent}>
                        <div className="field grid">
                            <label htmlFor="name" className="col-12 mb-2 md:col-2 md:mb-0">שם:</label>
                            <div className="col-12 md:col-10">
                                <InputText ref={inputName} type='text' defaultValue={course.name} /><br />
                            </div><br /><br />
                            <label htmlFor="description" className="col-12 mb-2 md:col-2 md:mb-0">תאור:</label>
                            <div className="col-12 md:col-10">
                                <InputText ref={inputDescription} type='text' defaultValue={course.description} /><br />
                            </div><br /><br />
                            <label htmlFor="price" className="col-12 mb-2 md:col-2 md:mb-0">מחיר:</label>
                            <div className="col-12 md:col-10">
                                <InputText ref={inputPrice} type='number' defaultValue={course.price} /><br />
                            </div>
                            <br />
                            <br />
                            <label htmlFor="teacherName" className="col-12 mb-2 md:col-2 md:mb-0">שם המורה:</label>
                            <div className="col-12 md:col-10">
                                <Dropdown
                                    value={selectedTeacher}
                                    options={Array.isArray(teachers) ? teachers : []}
                                    onChange={(e) => setSelectedTeacher(e.value)}
                                    optionLabel="userId.name"
                                    placeholder="Select a teacher"
                                />
                            </div>
                            <br />
                            <br />
                            <label htmlFor="minClass" className="col-12 mb-2 md:col-2 md:mb-0"> מכיתה :</label>
                            <div className="col-12 md:col-10">
                                <Dropdown
                                    value={selectedMinClass}
                                    options={['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח']}
                                    onChange={(e) => setSelectedMinClass(e.value)}
                                    optionLabel="userId.name"
                                    placeholder="Select min class"
                                />
                            </div>
                            <br />
                            <br />
                            <label htmlFor="maxClass" className="col-12 mb-2 md:col-2 md:mb-0"> עד כיתה :</label>
                            <div className="col-12 md:col-10">
                                <Dropdown
                                    value={selectedMaxClass}
                                    options={['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח']}
                                    onChange={(e) => setSelectedMaxClass(e.value)}
                                    optionLabel="userId.name"
                                    placeholder="Select max class"
                                />
                            </div>
                            <br />
                            <br />


                        </div>








                    </Dialog>
                    <Dialog header={course.name} visible={visibleDetails} style={{ width: '50vw' }} onHide={() => setVisibleDetails(false)}>
                        <div className="p-3">
                            <div className="p-grid">
                                {props.course.description && (
                                    <div className="p-col-12 p-md-6 mb-3">
                                        <span className="font-bold">תאור:</span>
                                        <span className="p-ml-2">{props.course.description}</span>
                                    </div>
                                )}
                                {props.course.teacherId &&console.log(props.course.teacherId)&& (//
                                    <>
                                        <div className="p-col-12 p-md-6 mb-3">
                                            <span className="font-bold">שם המורה:</span>
                                            <span className="p-ml-2">{props.course.teacherId.userId.name}</span>
                                        </div>
                                        <div className="p-col-12 p-md-6 mb-3">
                                            <span className="font-bold">טלפון המורה:</span>
                                            <span className="p-ml-2">{props.course.teacherId.userId.phone}</span>

                                        </div>
                                    </>
                                )}
                                {props.course.price && (
                                    <div className="p-col-12 p-md-6 mb-3">
                                        <span className="font-bold">מחיר:</span>
                                        <span className="p-ml-2">{props.course.price}</span>
                                    </div>
                                )}

                                {props.course.domain && (
                                    <div className="p-col-12 p-md-6 mb-3">
                                        <span className="font-bold">תחום:</span>
                                        <span className="p-ml-2">{props.course.domain}</span>
                                    </div>
                                )}
                                {props.course.minClass && (
                                    <div className="p-col-12 p-md-6 mb-3">
                                        <span className="font-bold">מכיתה:</span>
                                        <span className="p-ml-2">{props.course.minClass}</span>
                                    </div>
                                )}
                                {props.course.maxClass && (
                                    <div className="p-col-12 p-md-6 mb-3">
                                        <span className="font-bold">עד כיתה:</span>
                                        <span className="p-ml-2">{props.course.maxClass}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Dialog>
                    <Dialog header={course.name} visible={visibleDelete} style={{ width: '50vw' }} onHide={() => setVisibleDelete(false)} footer={footerDelete}>
                        <p className="m-0" style={{ fontSize: 20 }}>
                            האם אתה בטוח כי ברצונך למחוק את החוג {course.name}?
                        </p>
                    </Dialog>
                </Card>
            </div>
        </div>
    );
}



