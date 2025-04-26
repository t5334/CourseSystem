import React, { useEffect, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import './StudentInfo.css'; 

const Student=(props)=>{
const [attendance, setAttendance] = useState(false);
//setAttendance(data.attendance);
const handleAttendanceChange = (e) => {
    setAttendance(e.checked);
    // Here you would also make an API call to update the attendance
    // await updateAttendanceAPI(studentData.id, e.checked);
};


return (
    <div className="student-info">
        <h3>פרטי תלמידה:</h3>
        <p>שם החוג: {studentData.courseName}</p>
        <p>מספר טלפון: {studentData.phoneNumber}</p>
        <p>כיתה: {studentData.className}</p>
        <div className="p-field">
            <Checkbox inputId="attendance" checked={attendance} onChange={handleAttendanceChange} />
            <label htmlFor="attendance">Mark Attendance</label>
        </div>
    </div>
);
}

export default Student;