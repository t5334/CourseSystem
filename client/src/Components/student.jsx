
// // import React, { useState } from 'react';
// // import { Checkbox } from 'primereact/checkbox';  
// // import axios from 'axios';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Button } from 'primereact/button';

// // const Student = (props) => {
// //     const [attendance, setAttendance] = useState(false);
// //     const studentData = props.student;
// //     const {token} = useSelector((state) => state.token);
// //     const handleAttendanceChange = async (e) => {
// //         setAttendance(e.checked);
// //         try {
// //             const res = await axios.put('http://localhost:7000/api/lesson', props.student._id,{headers:{Authorization:`Bearer ${token}`}});
// //             if (res.status === 200) {
// //                 console.log(`The student's attendance (${props.student._id}) updated successfully.`);
// //             }
// //         } catch (e) {
// //             console.error(e);
// //         }
// //     };
// //     const updatePay = async () => { 

// //     }

// //     return (
// //         <tr>
// //             <td>{studentData.userId.name}</td>
// //             <td>{studentData.userId.phone}</td>
// //             <td>{studentData.yearbook} {studentData.numClass}</td>
// //             {studentData.course?<td>{studentData.course}</td>:<></>}
// //             {props.presence?(<td>
// //                 <Checkbox
// //                     inputId={`attendance-${studentData._id}`}
// //                     checked={attendance}
// //                     onChange={handleAttendanceChange}
// //                 />
// //                 <label htmlFor={`attendance-${studentData._id}`}>נוכחות</label>
// //             </td>):<Button onClick={updatePay()}/>}
// //         </tr>
// //     );
// // };

// // export default Student;
// import React, { useState } from "react";
// import { Checkbox } from "primereact/checkbox";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { Button } from "primereact/button";

// const Student = (props) => {
//     const [attendance, setAttendance] = useState(false);
//     const studentData = props.student;
//     const { token } = useSelector((state) => state.token);
//     console.log("props")
//     console.log(props);

//     const handleAttendanceChange = async (e) => {
//         setAttendance(e.checked);
//         try {
//             const res = await axios.put(
//                 "http://localhost:7000/api/lesson",
//                 { studentId: props.student._id },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             if (res.status === 200) {
//                 console.log(`The student's attendance (${props.student._id}) updated successfully.`);
//             }
//         } catch (e) {
//             console.error(e);
//         }
//     };
//     const updatePay=()=>{

//     }

//     return (
//         <tr>
//             <td>{studentData.userId.name}</td>
//             <td>{studentData.userId.phone}</td>
//             <td>
//                 {studentData.yearbook} {studentData.numClass}
//             </td>
            
//             <td>
//                 {studentData.course?.length ? studentData.course.courseId.name : "No course assigned"}
//             </td>
//             <td>
//             {studentData.course?.length ? <Button onClick={updatePay()}/> : null}
//             </td>
//             {props.pre&&(<td>
//                 <Checkbox
//                     inputId={`attendance-${studentData._id}`}
//                     checked={attendance}
//                     onChange={handleAttendanceChange}
//                 />
//                 <label htmlFor={`attendance-${studentData._id}`}>נוכחות</label>
//             </td>)}
//         </tr>
//     );
// };

// export default Student;

import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import PaymentUpdateDialog from './PaymentUpdateDialog'; 

const Student = (props) => {
    const [attendance, setAttendance] = useState(false);
    const studentData = props.student;
    const { token,user } = useSelector((state) => state.token); 
    const [dialogVisible, setDialogVisible] = useState(false);
    console.log("consle");
    console.log((props));
        const handleOpenDialog = () => {
            setDialogVisible(true);
        }
    const handleAttendanceChange = async (e) => {
        setAttendance(e.checked);
        try {
            const res = await axios.put(
                "http://localhost:7000/api/lesson",
                { StudentId: studentData._id,}, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.status === 200) {
                console.log(`The student's attendance (${studentData._id}) updated successfully.`);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (<>
        <tr>
            <td>{studentData.userId ? studentData.userId.name : "N/A"}</td>
            <td>{studentData.userId ? studentData.userId.phone : "N/A"}</td>
            <td>
                {studentData.yearbook} {studentData.numClass}
            </td>
            <td>
                {studentData.course ? studentData.course.courseId.name : "No course assigned"}
            </td>
            <td>
                {studentData.course && user.role==="Manager" && props.up && (
                    <Button label="עדכן תשלום" onClick={handleOpenDialog} />
                ) }
            </td>
            {props.pre && (
                <td>
                    <Checkbox
                        inputId={`attendance-${studentData._id}`}
                        checked={attendance}
                        onChange={handleAttendanceChange}
                    />
                    <label htmlFor={`attendance-${studentData._id}`}>נוכחות</label>
                </td>
            )}
            {props.debt&&
            <td>
                {props.debt}
            </td>
            }
        </tr>
        {studentData.course && user.role==="Manager" && props.up && <PaymentUpdateDialog 
                visible={dialogVisible} 
                onHide={() => setDialogVisible(false)} 
                student={studentData} 
                course={studentData.course} 
                registrationId={props.registrationId}
                up={"1"}
            />}
             </>
    );
    
};

export default Student;