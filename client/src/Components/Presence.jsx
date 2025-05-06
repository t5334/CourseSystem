import { useEffect, useState } from "react"
import Course from "./Course"
import axios from "axios";
import { Dropdown } from 'primereact/dropdown';
import { useDispatch, useSelector } from 'react-redux';


const Presence = () => {
    const { user } = useSelector((state) => state.token);
    console.log("user in presence",user);
    const techerid=user._id
    const [data, setData] = useState([])
    const [datacourses,setdatacourses]=useState([])
    const [course,setCourse]=useState(null)
    const {token} = useSelector((state) => state.token);
    const getcourses=async()=>{
        try {
            console.log("techerid  " +techerid);
            const res = await axios.get(`http://localhost:7000/api/course/techer/${techerid}`,{headers:{Authorization:`Bearer ${token}`}})
            console.log(res.status);
            if(res.status=== 400){
                alert(res.response.data.message)
            }
            if(res.status!== 200){
                alert("No courses at all")
            }
            if (res.status === 200) {
                console.log(res.data);
                setdatacourses(res.data)
            }
        } catch (e) {
            console.error(e)
        } 
    }
    if (course) {
        console.log("course", course);
    
    const courseid=course._id

    const getstudents = async () => {
        try {
            console.log("courseid" +courseid);
            const res = await axios.get('http://localhost:7000/api/register/course/'+{courseid},{headers:{Authorization:`Bearer ${token}`}})
            if (res.status === 200) {
                console.log(res.data);
                setData(res.data)
            }
        } catch (e) {
            console.error(e)
        }
    }
    const createLesson=async()=>{
        try{
            const lesson={
                courseId:courseid, 
                time:new Date().toISOString()
            }
const res=await axios.post('http://localhost:7000/api/lesson',lesson,{headers:{Authorization:`Bearer ${token}`}})
        }
        catch(e){
console.error(e)
        }
    }}
    useEffect(()=>{
        getcourses() 
        console.log("course",course);
        //getstudents()
        //createLesson()
    },[])
return <>
<div className="field grid">
                    <label htmlFor="CoursesList" className="col-12 mb-2 md:col-2 md:mb-0">course:</label>
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
{/* לרוץ על כל התלמידות ולהציג אותם */} pre={"1"}
</>

}
export default Presence