import axios from "axios"
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from "react"
const Lesson = () => {
    const [datacourses, setdatacourses] = useState([])
    const [course, setCourse] = useState(null)
    const getcourses = async () => {
        try {
            const res = await axios.get('http://localhost:7000/api/course')
            if (res.status === 200) {
                console.log(res.data);
                setdatacourses(res.data)
            }
        } catch (e) {
            console.error(e)
        }
    }
    

    const getlessons = async () => {
        const courseid = course._id
const url = 'http://localhost:7000/api/lesson/course/' + courseid
        try {
            const res = await axios.get(url)
            if (res.status === 200) {
                console.log(res.data);
                //setdatacourses(res.data)
            }
        }
        catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        getcourses()
    }, [])
    useEffect(() => {
        if (course) {
          console.log('Value is ready:', course);
          getlessons();
          // Run your function logic here
        }
      }, [course]);
    return (<>
        <div className="field grid">
            <label htmlFor="CoursesList" className="col-12 mb-2 md:col-2 md:mb-0">course:</label>
            <div className="col-12 md:col-10">
                <Dropdown
                    value={course}
                    options={datacourses}
                    onChange={(e) => {
                        setCourse(e.value);
                        console.log(e.value);
                        console.log(course);
                        //getlessons();
                    }}
                    optionLabel="name"
                    placeholder="Select a course"
                /><br />
            </div>
        </div></>)
}
export default Lesson