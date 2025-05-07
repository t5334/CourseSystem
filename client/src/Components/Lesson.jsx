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
import axios from "axios";
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable'; // Import DataTable
import { Column } from 'primereact/column'; // Import Column

const Lessons = () => {
    const [datacourses, setdatacourses] = useState([]);
    const [course, setCourse] = useState(null);
    const [lessonsData, setLessonsData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [studentsList, setStudentsList] = useState([]);
    const { user,token } = useSelector((state) => state.token);
    const [paymentDialogVisible, setPaymentDialogVisible] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);

    const openPaymentDialog = (lesson) => {
        setSelectedLesson(lesson); // Store the selected lesson
        setPaymentDialogVisible(true);
    };
    
    const handlePaymentUpdate =async () => {
        // Logic to update the payment for the selected student
        if (selectedLesson) {
            const lesson={
                id:selectedLesson._id,
                way:true
            }
            const res=axios.put('http://localhost:7000/api/lesson',lesson,{ headers: { Authorization: `Bearer ${token}` } })
            if(res.state===200){
                alert("תשלום עודכן")
                console.log("Updating payment for lesson:", selectedLesson);
            }
            // Use selectedLesson.id or any other property as needed
            console.log("Updating payment for lesson:", selectedLesson);
            // Add logic to update the payment as necessary
        }


        setPaymentDialogVisible(false);
    };
    
    const handleCancel = () => {
        setPaymentDialogVisible(false);
    };

    const getcourses = async () => {
        try {
            const res = await axios.get('http://localhost:7000/api/course', { headers: { Authorization: `Bearer ${token}` } });
            if (res.status === 200) {
                setdatacourses(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const getlessons = async () => {
        const courseid = course._id;
        const url = `http://localhost:7000/api/lesson/course/${courseid}`;
        try {
            const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
            if (res.status === 200) {
                setLessonsData(res.data);
            }
            else
            alert("אין שיעורים לחוג זה")
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getcourses();
    }, []);

    useEffect(() => {
        if (course) {
            getlessons();
        }
    }, [course]);

    const openDialog = (students) => {
        setStudentsList(students);
        setVisible(true);
    };

    const closeDialog = () => {
        setVisible(false);
        setStudentsList([]);
    };
    const getstudents=async(lessonId)=>{
        //openDialog(rowData.students)
    }
    


    return (
        <>
            <div className="field grid">
                <label htmlFor="CoursesList" className="col-12 mb-2 md:col-2 md:mb-0">Course:</label>
                <div className="col-12 md:col-10">
                    <Dropdown
                        value={course}
                        options={datacourses}
                        onChange={(e) => setCourse(e.value)}
                        optionLabel="name"
                        placeholder="Select a course"
                    /><br />
                </div>
            </div>

            <h2>רשימת שיעורים  ל {course?.name?course.name:""}</h2>
            <DataTable value={lessonsData} tableStyle={{ width: '100%' }}>
                <Column field="name" header="Lesson Name" body={course?.name?course.name:"unknown"} />
                <Column field="datePaid" header="Date Paid" body={(lessonsData) => lessonsData.payment || "Not Paid"} />
                <Column header="Payment Update" body={(lesson) => (
        <Button 
            label="Update Payment" 
            onClick={() => openPaymentDialog(lesson)}  
        />
    )} />
    <Column header="Students List" body={(lesson) => (
        <Button 
            label="View Students" 
            onClick={() => getstudents(lesson.id)} // Update this to use lesson id
        />
    )} />
            </DataTable>

            <Dialog header="Students List" visible={visible} onHide={closeDialog}>
                <div>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Student Name</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsList.map(student => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Dialog>
            <Dialog 
    header="Update Payment"
    visible={paymentDialogVisible}
    onHide={handleCancel}
>
    <div>
        <p>אתה בטוח שאתה מעדכן תשלום לחוג זה?</p>
        <Button onClick={()=>{handlePaymentUpdate()}} label="כן" />
        <Button onClick={handleCancel} label="לא"/>
    </div>
</Dialog>
        </>
    );
};

export default Lessons;