import React, { useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import CourseRegistration from './CourseRegistration'; // Ensure you have a registration component for students
import { Dropdown } from 'primereact/dropdown';

export default function Course(props) {
    const {course, role,teachers }=props
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [visibleDetails, setVisibleDetails] = useState(false);
    const [selectedTeacher,setSelectedTeacher] = useState(null);//props.teacherId?props.teacherId.userId.name:null
    
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

    const handleUpdate = () => {
        // Update logic here
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
                    <Button severity="warning" icon="pi pi-file-plus" tooltip="הצג פרטים" tooltipOptions={{ position: 'bottom' }} onClick={() => setVisibleDetails(true)} />
                        
                </>
            )}
            {role === 'student' && (
                <Button severity="warning" label='Register' icon="pi pi-plus" onClick={handleRegister} />

            )}
        </>
    );
    // const teacherOptions = Array.isArray(teachers) ? teachers : [];

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
                            </div><br /><br />
                            <label htmlFor="teacherName" className="col-12 mb-2 md:col-2 md:mb-0">שם המורה:</label>
                            <div className="col-12 md:col-10">
                            <Dropdown
                            value={selectedTeacher}
                            options={Array.isArray(teachers) ? teachers : []}
                            onChange={(e) => setSelectedTeacher(e.value)}
                            optionLabel="userId.name"
                            placeholder="Select a teacher"
                        /><br />
                            </div><br /><br />
                          
                            
                            
                     
                           
                        </div>
                      
                        
                          
                           
    
                              
                        
                   
                    </Dialog>
                    <Dialog header={course.name} visible={visibleDetails} style={{ width: '50vw' }} onHide={() => setVisibleDetails(false)}>
    <div className="p-3">
        <div className="p-grid">
            {props.course.price && (
                <div className="p-col-12 p-md-6 mb-3">
                    <span className="font-bold">מחיר:</span>
                    <span className="p-ml-2">{props.course.price}</span>
                </div>
            )}
            {props.course.description && (
                <div className="p-col-12 p-md-6 mb-3">
                    <span className="font-bold">תאור:</span>
                    <span className="p-ml-2">{props.course.description}</span>
                </div>
            )}
            {props.course.domain && (
                <div className="p-col-12 p-md-6 mb-3">
                    <span className="font-bold">תחום:</span>
                    <span className="p-ml-2">{props.course.domain}</span>
                </div>
            )}
        </div>
    </div>
</Dialog>

                
                    <Dialog header={course.name} visible={visibleDelete} style={{ width: '50vw' }} onHide={() => setVisibleDelete(false)} footer={footerDelete}>
                        <p className="m-0" style={{ fontSize: 20 }}>
                            Are you sure that you want to remove this course?
                        </p>
                    </Dialog>
                </Card>
            </div>
        </div>
    );
}



