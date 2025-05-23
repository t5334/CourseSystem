import { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown } from 'primereact/dropdown';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Student from "./student";

const Presence = () => {
    const { user } = useSelector((state) => state.token);
    const techerid = user.teacherId;
    const [data, setData] = useState([]);
    const [datacourses, setdatacourses] = useState([]);
    const [course, setCourse] = useState(null);
    const { token } = useSelector((state) => state.token);

    // State for handling lesson creation
    const [visible, setVisible] = useState(false);
    const [newLesson, setNewLesson] = useState({ name: '', time: new Date().toISOString().slice(0, 10), additionalExpenses: 0 });

    const getcourses = async () => {
        try {
            const res = await axios.get(`http://localhost:7000/api/course/techer/${techerid}`, { headers: { Authorization: `Bearer ${token}` } });
            if (res.status === 200) {
                setdatacourses(res.data);
            } else {
                alert("No courses at all");
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getcourses();
    }, []);

    useEffect(() => {
        if (course) {
            openAddLessonDialog(); // Open dialog immediately on course selection
        }
    }, [course]);

    const getstudents = async () => {
        const courseid = course._id;
        try {
            const res = await axios.get(`http://localhost:7000/api/register/course/${courseid}`, { headers: { Authorization: `Bearer ${token}` } });
            if (res.status === 200) {
                await setData(res.data);
                // console.log("data");
                // console.log(data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const openAddLessonDialog = () => {
        setNewLesson({ name: course.name, time: new Date().toDateString(), additionalExpenses: 0 }); // Auto-fill course name and current time
        setVisible(true);
    };

    const handleAddLesson = async () => {
        const courseid = course._id;
        const lesson = {
            courseId: courseid,
            time: newLesson.time,
            additionalExpenses: newLesson.additionalExpenses
        };

        try {
            const res = await axios.post('http://localhost:7000/api/lesson', lesson, { headers: { Authorization: `Bearer ${token}` } });
            if (res.status === 201) {
                console.log("Lesson created:", res.data);
                setVisible(false); // Close the dialog
                getstudents(); // Refresh students list
            }
        } catch (e) {
            console.error(e);
        }
        getstudents()
    };

    const selectCours = (e) => {
        setCourse(e.value);
    };

    return (
        <>
            <div className="field grid">
                <label htmlFor="CoursesList" className="col-12 mb-2 md:col-2 md:mb-0">Course:</label>
                <div className="col-12 md:col-10">
                    <Dropdown
                        value={course}
                        options={datacourses}
                        onChange={selectCours}
                        optionLabel="name"
                        placeholder="Select a course"
                    /><br />
                </div>
            </div>

            {/* Dialog for Adding Lesson*/}
            <Dialog header="Add Lesson" visible={visible} onHide={() => setVisible(false)}>
                <div className="p-field">
                    <label htmlFor="lessonName">Course Name:</label>
                    <input
                        type="text"
                        id="lessonName"
                        value={newLesson.name}
                        readOnly
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="lessonTime">Time:</label>
                    <input
                        type="time"
                        id="lessonTime"
                        value={newLesson.time.slice(11, 16)} // Extract only time from ISO string
                        readOnly
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="additionalExpenses">Additional Expenses:</label>
                    <input
                        type="number"
                        id="additionalExpenses"
                        value={newLesson.additionalExpenses}
                        onChange={(e) => setNewLesson({ ...newLesson, additionalExpenses: +e.target.value })}
                    />
                </div>
                <Button label="Submit" onClick={handleAddLesson} />
            </Dialog>
            {data && <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Student Name</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Phone</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Class</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Attendance Mark</th>
                    </tr>
                </thead>
                <tbody>
                    {console.log(data)}
                    {data.map((item) => (
                        <Student
                            key={item.studentId} // Always add a unique key
                            student={item.studentId}
                            pre={"1"}
                        />
                    ))}
                </tbody>
            </table>
            }
            {/* Display your students or other information here */}
        </>
    );
}

export default Presence;