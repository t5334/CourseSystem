import axios from "axios"
import { useState,useEffect } from "react"
import Student from './student'
import { useDispatch, useSelector } from 'react-redux';


const Debtors=()=>{
 const [data,setData]=useState([])
 const {token} = useSelector((state) => state.token);
 const loading=()=>{
    const res=axios.get('http://localhost:7000/api/register/debt',{headers:{Authorization:`Bearer ${token}`}})
    if(res.status=200){
        setData(res.data)
        if(data.length==0)
            alert("No debts at all")
    }
 }
 useEffect(() => {
    loading()
}, []);
return(<>
{/* להעבור ולהציג את כל התלמידות */}
<div className="grid">
                    {data.map((item) => (
                        <Student
                            // setCourses={setData}
                            // teachers={teachers}
                            // setTeachers={setTeachers}
                            student={item}
                            role={"student"}
                        />
                    ))}
                </div>
</>)
}
export default Debtors