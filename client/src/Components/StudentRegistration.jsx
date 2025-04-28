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
// 
import axios from "axios";
import React from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

export default function StudentRegistration(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async(data) => {
    try {
      const res = await axios.post('http://localhost:7000/api/students', data);
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
  };

  const classes = [
    { label: 'א', value: 'א' },
    { label: 'ב', value: 'ב' },
    { label: 'ג', value: 'ג' },
    { label: 'ד', value: 'ד' },
    { label: 'ה', value: 'ה' },
    { label: 'ו', value: 'ו' },
    { label: 'ז', value: 'ז' },
    { label: 'ח', value: 'ח' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
      <div className="field">
        <label htmlFor="name">שם</label>
        <InputText id="name" {...register("שם", { required: true })} />
        {errors.שם && <small className="p-error">שם הוא שדה חובה.</small>}
      </div>
      <div className="field">
        <label htmlFor="username">שם משתמש</label>
        <InputText id="username" {...register("שם משתמש", { required: true })} />
        {errors["שם משתמש"] && <small className="p-error">שם משתמש הוא שדה חובה.</small>}
      </div>
      <div className="field">
      <label htmlFor="username">סיסמא</label>
          <InputText id="password" type="password" {...register("סיסמא", {
            required: true,
            minLength: {
              value: 8,
              message: "הסיסמא חייבת להיות באורך של לפחות 8 תווים."
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
              message: "הסיסמא חייבת לכלול לפחות אות גדולה, אות קטנה ומספר."
            }
          })} />
        {errors["סיסמא"] && <small className="p-error">{errors["סיסמא"].message}</small>}
      </div>
      <div className="field">
        <label htmlFor="email">מייל</label>
        <InputText id="email" type="email" {...register("מייל", { required: true })}  />
        {errors.מייל && <small className="p-error">מייל הוא שדה חובה.</small>}
      </div>
      <div className="field">
        <label htmlFor="phone">מספר טלפון</label>
        <InputText id="phone" type="tel" {...register("מספר טלפון", { required: true })}  />
        {errors["מספר טלפון"] && <small className="p-error">מספר טלפון הוא שדה חובה.</small>}
      </div>
      <div className="field">
        <label htmlFor="class">כיתה</label>
        <Dropdown id="class" options={classes} {...register("כיתה", { required: true })}  />
        {errors.כיתה && <small className="p-error">כיתה היא שדה חובה.</small>}
      </div>
      <div className="field">
        <label htmlFor="classNumber">מספר כיתה</label>
        <InputNumber id="classNumber" {...register("מספר כיתה", { required: true, min: 1, max: 10 })} />
        {errors["מספר כיתה"] && <small className="p-error">מספר כיתה הוא שדה חובה בין 1 ל-10.</small>}
      </div>
      <Button type="submit" label="שלח" />
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
