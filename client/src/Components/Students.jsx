
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from 'react-redux';

// import axios from "axios";
// import Student from "./student";

// const Students = () => {
//     const [data, setData] = useState([]);
//     const {token} = useSelector((state) => state.token);
//     const {user} = useSelector((state) => state.token);

//     const getStudents = async () => {
//         try {
//             console.log("Fetching students...");
//             console.log(token,user);
//             const res = await axios.get('http://localhost:7000/api/students',
//                 {headers:{Authorization:`Bearer ${token}`}}
//             );
//             console.log(res.data);
//             setData(res.data);
//         } catch (e) {
//             console.error("Error fetching students", e);
//         }
//     };
//     const getcourses=async() => {
    
//         try {
//             console.log("Fetching courses...");
//             const res = await axios.get(`http://localhost:7000/api/register//student/${ user._id}`,
//                 {headers:{Authorization:`Bearer ${token}`}}
//             );
//             console.log(res.data);
//         } catch (e) {
//             console.error("Error fetching courses", e);
//         }
//     }    

//     useEffect(() => {
//         getStudents();
//     }, []);

//     return (
//         <div>
//             <h2>Students List</h2>
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                     <tr>
//                         <th style={{ border: "1px solid black", padding: "8px" }}>שם התלמידה</th>
//                         <th style={{ border: "1px solid black", padding: "8px" }}>מספר טלפון</th>
//                         <th style={{ border: "1px solid black", padding: "8px" }}>כיתה</th>
//                         <th style={{ border: "1px solid black", padding: "8px" }}>נוכחות</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((item) => (
//                         <Student key={item._id} student={item} />
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Students;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Student from "./student";

const Students = () => {
    const [data, setData] = useState([]);
    const { token,user } = useSelector((state) => state.token);

    const getStudents = async () => {
        try {
            console.log("Fetching students...");
            const res = await axios.get("http://localhost:7000/api/students", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const students = await res.data;
            console.log(students);
    
            // Fetch courses for each student
            const studentsWithCourses = await Promise.all(
                students.map(async (student) => {
                    try {
                        const coursesRes = await axios.get(
                            `http://localhost:7000/api/register/student/${student._id}`,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        console.log(coursesRes.data); // Log course data to verify
            
                        // Use _id to extract registration IDs
                        const registrationIds = coursesRes.data.map(course => course._id); // Use _id for registration ID
                        return { ...student, courses: coursesRes.data, registrationIds }; // Attach registration IDs
                    } catch (error) {
                        console.error(`Error fetching courses for student ${student._id}:`, error);
                        return { ...student, courses: [], registrationIds: [] }; // Show the student without courses and IDs
                    }
                })
            )
            console.log(studentsWithCourses);
    
            setData(studentsWithCourses);
        } catch (e) {
            console.error("Error fetching students:", e);
        }
    };

    const transformData = (students) => {
        const transformed = [];
        students.forEach((student) => {
            if (student.courses && student.courses.length > 0) {
                // Add the student multiple times, once for each course
                student.courses.forEach((course, index) => {
                    transformed.push({
                        ...student,
                        course, 
                        registrationId: student.registrationIds[index] // Use extracted registration ID
                    }); 
                });
            } else {
                // Add the student once without a course
                transformed.push({ ...student, course: null, registrationId: null });
            }
        });
        return transformed;
    };

    useEffect(() => {
        getStudents();
    }, []);

    const transformedData = transformData(data);

    return (
        <div>
            <h2>Students List</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
        <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>שם התלמידה</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>מספר טלפון</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>כיתה</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>קורס</th>
            {user.role === "Manager" && (
                <th style={{ border: "1px solid black", padding: "8px" }}>עדכון תשלום</th>
            )}
        </tr>
    </thead>
    <tbody>
        {transformedData.map((student, index) => (
            <Student
                key={`${student._id}-${index}`}
                student={student}
                registrationId={student.registrationId}
                up={"1"}
               
            />
        ))}
    </tbody>
</table>
        </div>
    );
};

export default Students;