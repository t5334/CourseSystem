
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import axios from "axios";
import Student from "./student";

const Students = () => {
    const [data, setData] = useState([]);
    const {token} = useSelector((state) => state.token);
    const {user} = useSelector((state) => state.token);

    const getStudents = async () => {
        try {
            console.log("Fetching students...");
            console.log(token,user);
            const res = await axios.get('http://localhost:7000/api/students',
                {headers:{Authorization:`Bearer ${token}`}}
            );
            console.log(res.data);
            setData(res.data);
        } catch (e) {
            console.error("Error fetching students", e);
        }
    };

    useEffect(() => {
        getStudents();
    }, []);

    return (
        <div>
            <h2>Students List</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>שם התלמידה</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>מספר טלפון</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>כיתה</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>נוכחות</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <Student key={item._id} student={item} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Students;