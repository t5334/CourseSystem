import axios from "axios"
import { useState } from "react"

const Debtors=()=>{
 const [data,setData]=useState([])
 const loading=()=>{
    const res=axios.get('http://localhost:7000/api/register/debt')
    if(res.status=200){
        setData(res.data)
        if(data.length==0)
            alert("No debts at all")
    }
 }
return(<>
{/* להעבור ולהציג את כל התלמידות */}
</>)
}
export default Debtors