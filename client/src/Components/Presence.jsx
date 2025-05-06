// import { useEffect, useState } from "react"
// import Course from "./Course"
// import axios from "axios";
// import { Dropdown } from 'primereact/dropdown';
// import { useDispatch, useSelector } from 'react-redux';


// const Presence = () => {
//     const { user } = useSelector((state) => state.token);
//     console.log("user in presence",user);
//     const techerid=user._id
//     const [data, setData] = useState([])
//     const [datacourses,setdatacourses]=useState([])
//     const [course,setCourse]=useState(null)
//     const {token} = useSelector((state) => state.token);
//     const getcourses=async()=>{
//         try {
//             console.log("techerid  " +techerid);
//             const res = await axios.get(`http://localhost:7000/api/course/techer/${techerid}`,{headers:{Authorization:`Bearer ${token}`}})
//             console.log(res.status);
//             if(res.status=== 400){
//                 alert(res.response.data.message)
//             }
//             if(res.status!== 200){
//                 alert("No courses at all")
//             }
//             if (res.status === 200) {
//                 console.log(res.data);
//                 setdatacourses(res.data)
//             }
//         } catch (e) {
//             console.error(e)
//         } 
//     }
//     if (course) {
//         console.log("course", course);
    
//     const courseid=course._id

//     const getstudents = async () => {
//         try {
//             console.log("courseid" +courseid);
//             const res = await axios.get(`http://localhost:7000/api/register/course/${courseid}`,{headers:{Authorization:`Bearer ${token}`}})
//             if (res.status === 200) {
//                 console.log(res.data);
//                 setData(res.data)
//             }
//         } catch (e) {
//             console.error(e)
//         }
//     }
//     const createLesson=async()=>{
//         try{
//             const lesson={
//                 courseId:courseid, 
//                 time:new Date().toISOString()
//             }
// const res=await axios.post('http://localhost:7000/api/lesson',lesson,{headers:{Authorization:`Bearer ${token}`}})
//         }
//         catch(e){
// console.error(e)
//         }
//     }}
//     useEffect(()=>{
//         getcourses() 
//         console.log("course",course);
//         //getstudents()
//         //createLesson()
//     },[])
// return <>
// <div className="field grid">
//                     <label htmlFor="CoursesList" className="col-12 mb-2 md:col-2 md:mb-0">course:</label>
//                     <div className="col-12 md:col-10">
//                         <Dropdown 
//                             value={course} 
//                             options={datacourses} 
//                             onChange={(e) => setCourse(e.value)} 
//                             optionLabel="name" 
//                             placeholder="Select a course" 
//                         /><br />
//                     </div>
//                 </div>

// {/* לרוץ על כל התלמידות ולהציג אותם */} pre={"1"}
// </>

// }
// export default Presence
import { useEffect, useState } from "react"
import axios from "axios";
import { Dropdown } from 'primereact/dropdown';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const Presence = () => {
    const { user } = useSelector((state) => state.token);
    const techerid = user._id;
    const [data, setData] = useState([]);
    const [datacourses, setdatacourses] = useState([]);
    const [course, setCourse] = useState(null);
    const { token } = useSelector((state) => state.token);
    
    // State for handling lesson creation
    const [visible, setVisible] = useState(false);
    const [newLesson, setNewLesson] = useState({ name: '', time: '', additionalExpenses: 0 });

    const getcourses = async () => {
        try {
            const res = await axios.get(`http://localhost:7000/api/course/techer/${techerid}`, {headers: {Authorization: `Bearer ${token}`}});
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
            getstudents();
        }
    }, [course]);

    const getstudents = async () => {
        const courseid = course._id;
        try {
            const res = await axios.get(`http://localhost:7000/api/register/course/${courseid}`, {headers: {Authorization: `Bearer ${token}`}});
            if (res.status === 200) {
                setData(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const openAddLessonDialog = () => {
        setNewLesson({ name: '', time: '', additionalExpenses: 0 });
        setVisible(true);
    };

    const handleAddLesson = async () => {
        const courseid = course._id;
        const lesson = { 
            name: newLesson.name, 
            courseId: courseid, 
            time: newLesson.time, 
            additionalExpenses: newLesson.additionalExpenses 
        };

        try {
            const res = await axios.post('http://localhost:7000/api/lesson', lesson, { headers: { Authorization: `Bearer ${token}` } });
            if (res.status === 201) {
                console.log("Lesson created:", res.data);
                setVisible(false); // Close the dialog
                // Optionally, refresh students or lessons list here if necessary
            }
        } catch (e) {
            console.error(e);
        }
    };
    const selectCours=(e)=>{
       console.log("aaaa");
        setCourse(e.value)
        openAddLessonDialog()
    }

    return (
        <>
            <div className="field grid">
                <label htmlFor="CoursesList" className="col-12 mb-2 md:col-2 md:mb-0">Course:</label>
                <div className="col-12 md:col-10">
                    <Dropdown 
                        value={course} 
                        options={datacourses} 
                        onChange={() =>selectCours} 
                        optionLabel="name" 
                        placeholder="Select a course" 
                    /><br />
                </div>
            </div>

            <Button label="Add Lesson" onClick={openAddLessonDialog} />

            {/* Dialog for Adding Lesson */}
            <Dialog header="Add Lesson" visible={visible} onHide={() => setVisible(false)}>
                <div className="p-field">
                    <label htmlFor="lessonName">Lesson Name:</label>
                    <input
                        type="text"
                        id="lessonName"
                        value={newLesson.name}
                        onChange={(e) => setNewLesson({ ...newLesson, name: e.target.value })}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="lessonTime">Time:</label>
                    <input
                        type="time"
                        id="lessonTime"
                        value={newLesson.time}
                        onChange={(e) => setNewLesson({ ...newLesson, time: e.target.value })}
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

            {/* Display your students or other information here */}
            {/* Depending on your requirements */}
        </>
    );
};

export default Presence;