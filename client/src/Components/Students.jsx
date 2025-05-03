// import axios from "axios"
// import { useEffect, useState } from "react"
// import Student from "./student"

// const Students=()=>{
//     const [data,setdata]=useState([])
//     const getStudents=async()=>{
// try{
//     console.log("get");
// const res=axios.get('http://localhost:7000/api/students')
// console.log((await res).data);
// // if( res.status==200){
//     setdata((await res).data)
//     console.log(data);
// // }
// // else
// // console.log("not loiding");
// }
// catch(e){

// }
//     }
//     useEffect(() => {
//         console.log("loding");
//         getStudents()
//     }, []);
//     return(<>
//     <div className="grid">
//                     {data.map((item) => (
//                         <Student
//                             // setCourses={setData}
//                             // teachers={teachers}
//                             // setTeachers={setTeachers}
//                             student={item}
//                             role={"student"}
//                         />
//                     ))}
//                 </div>
//     </>)
// }
// export default Students
import React, { useEffect, useState } from "react";
import axios from "axios";
//import Student from "./";

const Students = () => {
    const [data, setData] = useState([]);

    const getStudents = async () => {
        try {
            console.log("Fetching students...");
            const res = await axios.get('http://localhost:7000/api/students');
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