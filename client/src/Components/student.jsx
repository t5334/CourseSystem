// import React, { useEffect, useState } from 'react';
// import { Checkbox } from 'primereact/checkbox';  
// import axios from 'axios';

// const Student = (props) => {
//     const [attendance, setAttendance] = useState(false);
//     const studentData=props.student
//     //setAttendance(data.attendance);
//     const handleAttendanceChange = async (e) => {
//         setAttendance(e.checked);
//         try {
//             const res = await axios.put('http://localhost:7000/api/lesson', props.student._id)
//             if (res.status == 200) {
//                 //console.log("the student "+{props.Student._id} +"update")
//             }
//         }
//         catch (e) {
//             console.error(e)
//         }
//     };
//     return (
//         <div className="student-info">
//             <h3>פרטי תלמידה:</h3>
//             <p>שם התלמידה: {studentData.userId.name}</p>
//             <p>מספר טלפון: {studentData.userId.phone}</p>
//             <p>כיתה: {studentData.yearbook +" "+ studentData.numClass}</p>
//             <div className="p-field">
//                 <Checkbox inputId="attendance" checked={attendance} onChange={handleAttendanceChange} />
//                 <label htmlFor="attendance">סימון נוכחות</label>
//             </div>
//         </div>
//     );
// }
// export default Student
import React, { useState } from 'react';
import { Checkbox } from 'primereact/checkbox';  
import axios from 'axios';

const Student = (props) => {
    const [attendance, setAttendance] = useState(false);
    const studentData = props.student;

    const handleAttendanceChange = async (e) => {
        setAttendance(e.checked);
        try {
            const res = await axios.put('http://localhost:7000/api/lesson', props.student._id);
            if (res.status === 200) {
                console.log(`The student's attendance (${props.student._id}) updated successfully.`);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <tr>
            <td>{studentData.userId.name}</td>
            <td>{studentData.userId.phone}</td>
            <td>{studentData.yearbook} {studentData.numClass}</td>
            <td>
                <Checkbox
                    inputId={`attendance-${studentData._id}`}
                    checked={attendance}
                    onChange={handleAttendanceChange}
                />
                <label htmlFor={`attendance-${studentData._id}`}>נוכחות</label>
            </td>
        </tr>
    );
};

export default Student;