//  const onSubmit = async (data) => {
//         try {
//             const res = await axios.post('http://localhost:7000/api/auth/register', data);
//             if (res.status === 400) {
//                 console.log(res.data);
//             }
//             if (res.status === 201) {
//                 console.log(res.data);
//             }
//             props.closeDialog();
//         } catch (error) {
//             console.log(error);
//         }
 //   }
import axios from "axios";
import React from 'react';
import { useForm } from 'react-hook-form';

export default function StudentRegistration(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async(data)=>{
    try {
    const res = await axios.post('http://localhost:7000/api/auth/register', data);
    if (res.status === 400) {
        console.log(res.data);
    }
    if (res.status === 201) {
        console.log(res.data);
    }
    props.closeDialog();
} catch (error) {
    console.log(error);
}
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="שם" {...register("שם", {required: true})} />
      <input type="text" placeholder="שם משתמש" {...register("שם משתמש", {required: true})} />
      {/* <input type="password" placeholder="סיסמא" {...register("סיסמא", {, pattern: //^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$//i})} /> */}
      <input type="email" placeholder="מייל" {...register("מייל", {required: true})} />
      <input type="tel" placeholder="מספר טלפון" {...register("מספר טלפון", {required: true})} />
      <select {...register("כיתה", { required: true })}>
        <option value="א">א</option>
        <option value="ב">ב</option>
        <option value="ג">ג</option>
        <option value="ד">ד</option>
        <option value="ה">ה</option>
        <option value="ו">ו</option>
        <option value="ז">ז</option>
        <option value="ח">ח</option>
      </select>
      <input type="number" placeholder="מספר כיתה" {...register("מספר כיתה", {required: true, max: 10, min: 1, maxLength: 1})} />

      <input type="submit" />
    </form>
  );
}
//     import { useForm } from "react-hook-form";
// import { InputText } from 'primereact/inputtext';


// export default function StudentRegistration(props) {
//     const { register, handleSubmit, formState: { errors } } = useForm();

   

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="field grid">
//                 <label htmlFor="userName" className="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10">שם משתמש:</label>
//                 <div className="col">
//                     <InputText {...register("userName", { required: "This field is required", maxLength: 20 })} />
//                     {errors.userName && <p className="error">{errors.userName.message}</p>}
//                 </div>
//             </div>
//             <div className="field grid">
//                 <label htmlFor="name" className="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10">שם:</label>
//                 <div className="col">
//                     <InputText {...register("name", {
//                         required: "This field is required",
//                     })} />
//                     {errors.name && <p className="error">{errors.name.message}</p>}
//                 </div>
//             </div>
//             <div className="field grid">
//                 <label htmlFor="password" className="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10">סיסמא:</label>
//                 <div className="col">
//                     <InputText type="password" {...register("password", { required: "This field is required" })} />
//                     {errors.password && <p className="error">{errors.password.message}</p>}
//                 </div>
//             </div>
//             <div className="field grid">
//                 <label htmlFor="email" className="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10">אימייל:</label>
//                 <div className="col">
//                     <InputText type="email" {...register("email", {
//                         required: "This field is required",
//                         pattern: {
//                             value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                             message: 'Invalid email address',
//                         }
//                     })} />
//                     {errors.email && <p className="error">{errors.email.message}</p>}
//                 </div>
//             </div>
//             <div className="field grid">
//                 <label htmlFor="phone" className="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10">פלאפון:</label>
//                 <div className="col">
//                     <InputText {...register("phone", {
//                         required: "This field is required",
//                         pattern: {
//                             value: /^(?:\+?\d{1,3})?[-.\s]?(\(?\d{3}\)?)[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
//                             message: 'Invalid phone number format',
//                         }
//                     })} />
//                     {errors.phone && <p className="error">{errors.phone.message}</p>}
//                 </div>
//             </div>
            
//             <input type="submit" />
//         </form>
//     );
// }
