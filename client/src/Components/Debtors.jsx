// import axios from "axios"
// import { useState, useEffect } from "react"
// import Student from './student'
// import { useDispatch, useSelector } from 'react-redux';
 import './Debtors.css'; 

// const Debtors = () => {
//     const [data, setData] = useState([])
//     const { token } = useSelector((state) => state.token);
//     const loading = async () => {
//         try {
//             const res = await axios.get('http://localhost:7000/api/register/debt', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             if (res.status === 200) {
//                 console.log(res.data)
//                 await setData(res.data);
//                 console.log("data");
//                 console.log(data);
//                 if (!res.data || res.data.length === 0) { // Check if the data is empty or null
//                     alert("No debts at all");
//                 }
//             }
//         } catch (e) {
//             if (e.response) {
//                 // The request was made and the server responded with a status code out of the 2xx range
//                 if (e.response.status === 400) {
//                     alert("No debts at all"); // Adjust based on server response
//                 } else {
//                     alert(`Error: ${e.response.status} - ${e.response.data.message || 'Something went wrong'}`);
//                 }
//             } else if (e.request) {
//                 // The request was made but no response was received
//                 console.error('No response received:', e.request);
//                 alert("No response from the server. Please try again later.");
//             } else {
//                 // Something went wrong in setting up the request
//                 console.error('Error:', e.message);
//                 alert("An error occurred: " + e.message);
//             }
//         }
//         console.log("debtors");
//         console.log(data);
//     }
//     useEffect(() => {
//         loading()
//     }, []);
//     return (<>
//         {/* להעבור ולהציג את כל התלמידות */}
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//     <thead>
//         <tr>
//             <th style={{ border: "1px solid black", padding: "8px" }}>שם התלמידה</th>
//             <th style={{ border: "1px solid black", padding: "8px" }}>מספר טלפון</th>
//             <th style={{ border: "1px solid black", padding: "8px" }}>כיתה</th>
//             <th style={{ border: "1px solid black", padding: "8px" }}>קורס</th>
//             <th style={{ border: "1px solid black", padding: "8px" }}>חובות</th>
//         </tr>
//     </thead>
//     <tbody>
//         <div>
//             {console.log(data)}
//             {data?.length && data.map((item) => (
//                 <Student 
//                     key={item._id}
//                     student={item.studentId} // Now this includes user information
//                     debt={item.debt} // Include the debt information
//                     course={item} // Send the course information
//                 />
//             ))}
//             </div></tbody>
//             </table></>
//         );}
//         export default Debtors
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Student from "./student"; // Reuse the Student component for rendering

const Debtors = () => {
    const [data, setData] = useState([]);
    const { token } = useSelector((state) => state.token);

    // Fetch debtor data
    const getDebtors = async () => {
        try {
            console.log("Fetching debtors...");
            const res = await axios.get("http://localhost:7000/api/register/debt", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const debtors = await res.data;

            // Fetch additional details for each debtor (e.g., course details)
            const debtorsWithDetails = await Promise.all(
                debtors.map(async (debtor) => {
                    try {
                        const courseRes = await axios.get(
                            `http://localhost:7000/api/register/student/${debtor.studentId._id}`,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        return { ...debtor, courses: courseRes.data };
                    } catch (error) {
                        console.error(`Error fetching course details for debtor ${debtor.studentId._id}`, error);
                        return { ...debtor, courses: [] };
                    }
                })
            );

            setData(debtorsWithDetails);
        } catch (e) {
            console.error("Error fetching debtors:", e);
        }
    };

    // Transform data for rendering
    const transformData = (debtors) => {
        const transformed = [];
        debtors.forEach((debtor) => {
            if (debtor.courses && debtor.courses.length > 0) {
                debtor.courses.forEach((course) => {
                    transformed.push({ ...debtor, course });
                });
            } else {
                transformed.push({ ...debtor, course: null });
            }
        });
        return transformed;
    };

    useEffect(() => {
        getDebtors();
    }, []);

    const transformedData = transformData(data);

    return (
        <div>
            <h2>Debtors List</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>שם התלמידה</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>מספר טלפון</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>כיתה</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>קורס</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>חוב</th>
                    </tr>
                </thead>
                <tbody>
                    {transformedData.map((debtor, index) => (
                        <Student
                            key={`${debtor.studentId._id}-${index}`}
                            student={debtor.studentId}
                            debt={debtor.debt}
                            course={debtor.course}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Debtors;