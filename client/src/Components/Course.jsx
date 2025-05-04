import React, { useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import CourseRegistration from './CourseRegistration'; // Ensure you have a registration component for students
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
export default function Course(props) {
    const { course, role, teachers, setCourses } = props
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [visibleDetails, setVisibleDetails] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedMinClass, setSelectedMinClass] = useState(null);
    const [selectedMaxClass, setSelectedMaxClass] = useState(null);
    const {token} = useSelector((state) => state.token);
    const inputName = useRef(null);
    const inputDescription = useRef(null);
    const inputPrice = useRef(null);
    const inputDomain = useRef(null);
    const inputMinClass = useRef(null);
    const inputMaxClass = useRef(null);
    const inputTeacherName = useRef(null);
    const navigate = useNavigate();
    const handleRegister = () => {

        navigate('/courseRegistration', { state: { course } });
    };

    const handleUpdate = async () => {
        const updatedCourse = {
            id: course._id,
            name: inputName.current?.value || course.name,
            description: inputDescription.current?.value || "",
            price: inputPrice.current?.value || course.price,
            teacherId: selectedTeacher?._id || course.teacherId?._id,
            minClass: selectedMinClass || course.minClass,
            maxClass: selectedMaxClass || course.maxClass,
        };

        try {
            const response = await axios.put(`http://localhost:7000/api/course`, updatedCourse, {
                headers: {
                    'Content-Type': 'application/json',
                   Authorization:`Bearer ${token}`
                },
            });

            console.log('Course updated successfully:', response.data);

            // סגירת הדיאלוג והצגת הודעת הצלחה
            setVisibleUpdate(false);
            alert('Course updated successfully!');

            // עדכון רשימת החוגים
            setCourses((prevCourses) =>
                prevCourses.map((c) => (c._id === course._id ? response.data : c))
            );
        } catch (error) {
            console.error('Error updating course:', error.response?.data || error.message);
            alert(`Failed to update course. ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDelete = async () => {
        try {
            setIsDeleteDisabled(true)
            console.log('Deleting course:', course._id);
            const response = await axios.delete(`http://localhost:7000/api/course/${course._id}`, 
                {headers:{Authorization:`Bearer ${token}`}
            });
            console.log('Course deleted successfully:', response.data);

            // Update the course list in the parent component
            setCourses((prevCourses) => prevCourses.filter((c) => c._id !== course._id));

            // Close the dialog and show success message
            setVisibleDelete(false);
            alert('Course deleted successfully!');
        } catch (error) {
            console.error('Error deleting course:', error.response?.data || error.message);
            alert('Failed to delete course. Please try again.');
        }
    };

    const footerDelete = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisibleDelete(false)} className="p-button-text" />
            <Button label="Yes" disabled={isDeleteDisabled} icon="pi pi-check" onClick={handleDelete} autoFocus />
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
                    <Button rounded severity="danger" icon="pi pi-trash" tooltip="מחק" tooltipOptions={{ position: 'bottom' }} onClick={() => setVisibleDelete(true)} />
                    <Button rounded severity="warning" icon="pi pi-pencil" tooltip="עדכן" tooltipOptions={{ position: 'bottom' }} onClick={() => setVisibleUpdate(true)} />
                    <Button rounded severity="info"  icon="pi pi-eye" tooltip="הצג פרטים" tooltipOptions={{ position: 'bottom' }} onClick={() => setVisibleDetails(true)} />

                </>
            )}
            {role === 'student' && (<>
                <Button rounded severity="warning" icon="pi pi-user-plus" tooltip='לרישום לקורס' tooltipOptions={{ position: 'bottom' }} onClick={() => handleRegister()} />
                <Button rounded icon="pi pi-eye" tooltip="הצג פרטים" tooltipOptions={{ position: 'bottom' }} onClick={() => setVisibleDetails(true)} />
            </>
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
                                {/* <Dropdown
                                    value={selectedTeacher}
                                    options={Array.isArray(teachers) ? teachers : []}
                                    onChange={(e) => setSelectedTeacher(e.value)}
                                    optionLabel="userId.name"
                                    placeholder={props.course.teacherId ? props.course.teacherId.userId.name : 'Select a teacher'}
                                /> */}
                                <Dropdown
                                    value={selectedTeacher}
                                    options={Array.isArray(teachers) ? teachers : []}
                                    onChange={(e) => { setSelectedTeacher(e.value); console.log(e.value); }}
                                    optionLabel="userId.name"
                                    placeholder={props.course?.teacherId?.userId?.name || 'Select a teacher'}
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
                                    placeholder={props.course.minClass ? props.course.minClass : 'Select min class'}
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
                                    placeholder={props.course.maxClass ? props.course.maxClass : 'Select max class'}
                                />
                            </div>
                            <br />
                            <br />


                        </div>








                    </Dialog>
                    {/* <Dialog header={course.name} visible={visibleDetails} style={{ width: '50vw' }} onHide={() => setVisibleDetails(false)}>
                        <div className="p-3">
                            <div className="p-grid">
                                {props.course.description && (
                                    <div className="p-col-12 p-md-6 mb-3">
                                        <span className="font-bold">תאור:</span>
                                        <span className="p-ml-2">{props.course.description}</span>
                                    </div>
                                )}
                                {props.course.teacherId && (//
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
                    </Dialog> */}
                    <Dialog header={course.name} visible={visibleDetails} style={{ width: '50vw' }} onHide={() => setVisibleDetails(false)}>
                        <div className="p-3">
                            <div className="p-grid">
                                {props.course?.description && (
                                    <div className="p-col-12 p-md-6 mb-3">
                                        <span className="font-bold">תאור:</span>
                                        <span className="p-ml-2">{props.course.description}</span>
                                    </div>
                                )}
                                {props.course?.teacherId?.userId?.name ? (
                                    <>
                                        <div className="p-col-12 p-md-6 mb-3">
                                            <span className="font-bold">שם המורה:</span>
                                            <span className="p-ml-2">{props.course.teacherId.userId.name}</span>
                                        </div>
                                        <div className="p-col-12 p-md-6 mb-3">
                                            <span className="font-bold">טלפון המורה:</span>
                                            <span className="p-ml-2">{props.course.teacherId.userId.phone || ''}</span>
                                        </div>
                                    </>
                                ) : (
                                    <p></p>
                                )}
                                {props.course?.price && (
                                    <div className="p-col-12 p-md-6 mb-3">
                                        <span className="font-bold">מחיר:</span>
                                        <span className="p-ml-2">{props.course.price}</span>
                                    </div>
                                )}
                                {props.course?.domain && (
                                    <div className="p-col-12 p-md-6 mb-3">
                                        <span className="font-bold">תחום:</span>
                                        <span className="p-ml-2">{props.course.domain}</span>
                                    </div>
                                )}
                                {props.course?.minClass && (
                                    <div className="p-col-12 p-md-6 mb-3">
                                        <span className="font-bold">מכיתה:</span>
                                        <span className="p-ml-2">{props.course.minClass}</span>
                                    </div>
                                )}
                                {props.course?.maxClass && (
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
