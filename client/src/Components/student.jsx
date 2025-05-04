
import React, { useState } from 'react';
import { Checkbox } from 'primereact/checkbox';  
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const Student = (props) => {
    const [attendance, setAttendance] = useState(false);
    const studentData = props.student;
    const {token} = useSelector((state) => state.token);
    const handleAttendanceChange = async (e) => {
        setAttendance(e.checked);
        try {
            const res = await axios.put('http://localhost:7000/api/lesson', props.student._id,{headers:{Authorization:`Bearer ${token}`}});
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