import React, { useEffect, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import './StudentInfo.css'; 

const Student=(props)=>{
const [attendance, setAttendance] = useState(false);
//setAttendance(data.attendance);
const handleAttendanceChange = async(e) => {
    setAttendance(e.checked);
    try{
const res=await axios.put('http://localhost:7000/api/lesson',props.Student._id)
if(res.status==200){
    //console.log("the student "+{props.Student._id} +"update")
}
    }
    catch(e){
console.error(e)
    }
};
return (
    <div className="student-info">
        <h3>פרטי תלמידה:</h3>
        <p>שם החוג: {studentData.courseName}</p>
        <p>מספר טלפון: {studentData.phoneNumber}</p>
        <p>כיתה: {studentData.className}</p>
        <div className="p-field">
            <Checkbox inputId="attendance" checked={attendance} onChange={handleAttendanceChange} />
            <label htmlFor="attendance">סימון נוכחות</label>
        </div>
    </div>
);
}