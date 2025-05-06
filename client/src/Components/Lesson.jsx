// // import axios from "axios"
// // import { Dropdown } from 'primereact/dropdown';
// // import { useEffect, useState } from "react"
// // import { useDispatch, useSelector } from 'react-redux';


// // const Lessons = () => {
// //     const [datacourses, setdatacourses] = useState([])
// //     const [course, setCourse] = useState(null)
// //     const { token } = useSelector((state) => state.token);
// //     const getcourses = async () => {
// //         try {
// //             const res = await axios.get('http://localhost:7000/api/course', { headers: { Authorization: `Bearer ${token}` } })
// //             if (res.status === 200) {
// //                 console.log(res.data);
// //                 setdatacourses(res.data)
// //             }
// //         } catch (e) {
// //             console.error(e)
// //         }
// //     }


// //     const getlessons = async () => {
// //         const courseid = course._id
// //         const url = 'http://localhost:7000/api/lesson/course/' + courseid
// //         try {
// //             const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
// //             if (res.status === 200) {
// //                 console.log(res.data);
// //                 //setdatacourses(res.data)
// //             }
// //         }
// //         catch (e) {
// //             console.error(e)
// //         }
// //     }
// //     useEffect(() => {
// //         getcourses()
// //     }, [])
// //     useEffect(() => {
// //         if (course) {
// //             console.log('Value is ready:', course);
// //             getlessons();
// //             // Run your function logic here
// //         }
// //     }, [course]);
// //     return (<>
// //         <div className="field grid">
// //             <label htmlFor="CoursesList" className="col-12 mb-2 md:col-2 md:mb-0">course:</label>
// //             <div className="col-12 md:col-10">
// //                 <Dropdown
// //                     value={course}
// //                     options={datacourses}
// //                     onChange={(e) => {
// //                         setCourse(e.value);
// //                         console.log(e.value);
// //                         console.log(course);
// //                         //getlessons();
// //                     }}
// //                     optionLabel="name"
// //                     placeholder="Select a course"
// //                 /><br />
// //             </div>
// //         </div></>)
// // }
// // export default Lessons
// import axios from "axios";
// import { Dropdown } from 'primereact/dropdown';
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { Button } from 'primereact/button';
// import { Dialog } from 'primereact/dialog';
// //import { Table } from 'primereact/table';

// const Lessons = () => {
//     const [datacourses, setdatacourses] = useState([]);
//     const [course, setCourse] = useState(null);
//     const [lessonsData, setLessonsData] = useState([]);
//     const [visible, setVisible] = useState(false);
//     const [studentsList, setStudentsList] = useState([]);
//     const { token } = useSelector((state) => state.token);

//     const getcourses = async () => {
//         try {
//             const res = await axios.get('http://localhost:7000/api/course', { headers: { Authorization: `Bearer ${token}` } });
//             if (res.status === 200) {
//                 setdatacourses(res.data);
//             }
//         } catch (e) {
//             console.error(e);
//         }
//     };

//     const getlessons = async () => {
//         const courseid = course._id;
//         const url = `http://localhost:7000/api/lesson/course/${courseid}`;
//         try {
//             const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
//             if (res.status === 200) {
//                 setLessonsData(res.data);
//             }
//         } catch (e) {
//             console.error(e);
//         }
//     };

//     useEffect(() => {
//         getcourses();
//     }, []);

//     useEffect(() => {
//         if (course) {
//             getlessons();
//         }
//     }, [course]);

//     const openDialog = (students) => {
//         setStudentsList(students);
//         setVisible(true);
//     };

//     const closeDialog = () => {
//         setVisible(false);
//         setStudentsList([]);
//     };

//     return (
//         <>
//             <div className="field grid">
//                 <label htmlFor="CoursesList" className="col-12 mb-2 md:col-2 md:mb-0">Course:</label>
//                 <div className="col-12 md:col-10">
//                     <Dropdown
//                         value={course}
//                         options={datacourses}
//                         onChange={(e) => setCourse(e.value)}
//                         optionLabel="name"
//                         placeholder="Select a course"
//                     /><br />
//                 </div>
//             </div>

//             <h2>Lessons List</h2>
//             <Table value={lessonsData} tableStyle={{ width: '100%' }}>
//                 <thead>
//                     <tr>
//                         <th style={{ border: "1px solid black", padding: "8px" }}>Lesson Name</th>
//                         <th style={{ border: "1px solid black", padding: "8px" }}>Date Paid</th>
//                         <th style={{ border: "1px solid black", padding: "8px" }}>Payment Update</th>
//                         <th style={{ border: "1px solid black", padding: "8px" }}>Students List</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {lessonsData.map((lesson) => (
//                         <tr key={lesson._id}>
//                             <td>{lesson.name}</td>
//                             <td>{lesson.datePaid || "Not Paid"}</td>
//                             <td>
//                                 <Button 
//                                     label="Update Payment" 
//                                     onClick={() => {/* Implement payment update logic here */}} 
//                                 />
//                             </td>
//                             <td>
//                                 <Button 
//                                     label="View Students" 
//                                     onClick={() => openDialog(lesson.students)} 
//                                 />
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             <Dialog header="Students List" visible={visible} onHide={closeDialog}>
//                 <div>
//                     <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                         <thead>
//                             <tr>
//                                 <th style={{ border: "1px solid black", padding: "8px" }}>Student Name</th>
//                                 <th style={{ border: "1px solid black", padding: "8px" }}>Phone Number</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {studentsList.map(student => (
//                                 <tr key={student.id}>
//                                     <td>{student.name}</td>
//                                     <td>{student.phone}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </Dialog>
//         </>
//     );
// };

// export default Lessons;