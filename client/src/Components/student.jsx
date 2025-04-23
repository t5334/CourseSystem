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
        <h3>Student Information</h3>
        <p>Course Name: {studentData.courseName}</p>
        <p>Phone Number: {studentData.phoneNumber}</p>
        <p>Class: {studentData.className}</p>
        <div className="p-field">
            <Checkbox inputId="attendance" checked={attendance} onChange={handleAttendanceChange} />
            <label htmlFor="attendance">Mark Attendance</label>
        </div>
    </div>
);
}

export default Student;