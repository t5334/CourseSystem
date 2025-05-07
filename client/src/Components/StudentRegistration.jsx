
// import axios from "axios";
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { InputText } from 'primereact/inputtext';
// import { InputNumber } from 'primereact/inputnumber';
// import { Dropdown } from 'primereact/dropdown';
// import { Button } from 'primereact/button';
// import { useDispatch, useSelector } from 'react-redux';
// import { Password } from 'primereact/password';
// export default function StudentRegistration(props) {
//   const { register, handleSubmit, formState: { errors } ,getValues, setValue } = useForm();
//   const {token} = useSelector((state) => state.token);
// const [selectedClass,setSelectedClass]=useState("")
//   const onSubmit = async(data) => {
//     console.log(data);
//     try {
//       const res = await axios.post('http://localhost:7000/api/students', data,{headers:{Authorization:`Bearer ${token}`}}

//       );
//       if (res.status === 400) {
//         console.log(res.data);
//       }
//       if (res.status === 201) {
//         console.log(res.data);
//       }
//       props.closeDialog();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const classes = [
//     { label: 'א', value: 'א' },
//     { label: 'ב', value: 'ב' },
//     { label: 'ג', value: 'ג' },
//     { label: 'ד', value: 'ד' },
//     { label: 'ה', value: 'ה' },
//     { label: 'ו', value: 'ו' },
//     { label: 'ז', value: 'ז' },
//     { label: 'ח', value: 'ח' },
//   ];

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
//       <div className="field">
//         <label htmlFor="name">שם</label>
//         <InputText id="name" {...register("name", { required: true })} />
//         {errors.שם && <small className="p-error">שם הוא שדה חובה.</small>}
//       </div>
//       <div className="field">
//         <label htmlFor="userName">שם משתמש</label>
//         <InputText id="userName" {...register("userName", { required: true })} />
//         {errors["שם משתמש"] && <small className="p-error">שם משתמש הוא שדה חובה.</small>}
//       </div>
//       <div className="field">
//   <label htmlFor="password">סיסמא</label>
//   <Password
//     id="password"
//     type="password"
//     toggleMask
//     feedback={true} 
//     {...register("password", {
//       required: "סיסמא היא שדה חובה.",
//       minLength: {
//         value: 8,
//         message: "הסיסמא חייבת להיות באורך של לפחות 8 תווים."
//       },
//       pattern: {
//         value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
//         message: "הסיסמא חייבת לכלול לפחות אות גדולה, אות קטנה ומספר."
//       }
//     })}
//   />
//   {errors["סיסמא"] && <small className="p-error">{errors["סיסמא"].message}</small>}
// </div>
//       <div className="field">
//         <label htmlFor="email">מייל</label>
//         <InputText id="email" type="email" {...register("email", { required: "מייל הוא שדה חובה.",
//         pattern: {
//           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//           message: "כתובת מייל אינה תקינה."
//         } })}  />
//         {errors.מייל && <small className="p-error">{errors["מייל"].message}</small>}
//       </div>
//       <div className="field">
//         <label htmlFor="phone">מספר טלפון</label>
//         <InputText id="phone" type="tel" {...register("phone", { required: "מספר טלפון הוא שדה חובה.",
//         pattern: {
//           value: /^[0-9]{9}$/,
//           message: "מספר טלפון חייב להיות באורך של 9-10 ספרות."
//         }})}  />
//         {errors["phone"] && <small className="p-error">{errors["מספר טלפון"].message}</small>}
//       </div>
//       <div className="field">
//       <label htmlFor="class">כיתה</label>
//   <Dropdown 
//     id="class" 
//     options={classes} 
//     {...register("class", { required: true })}  
//     value={selectedClass} 
//     onChange={(e) => setSelectedClass(e.value)} // You need to manage the change event
//   />
//   {errors.כיתה && <small className="p-error">כיתה היא שדה חובה.</small>}
//       </div>
//       <div className="field">
//         <label htmlFor="classNumber">מספר כיתה</label>
//         <InputText id="classNumber" {...register("classNumber", { required: true, min: 1, max: 10 })
//       } 
//       onChange={(e) => {
//         const valueAsNumber = Number(e.target.value); // Convert input value to number
//         // Check if the conversion is a valid number
//         if (!isNaN(valueAsNumber)) {
//             setValue("classNumber", valueAsNumber); // Set as number in form state
//         } else {
//             setValue("classNumber", ""); // Clear invalid input or set as needed
//         }
//         console.log("Current value:", valueAsNumber, "Type:", typeof valueAsNumber);
//     }} 
//       mode="decimal"/>
//         {errors["מספר כיתה"] && <small className="p-error">מספר כיתה הוא שדה חובה בין 1 ל-10.</small>}
//       </div>
//       <Button type="submit" label="שלח" />
//       {console.log(errors)}
//     </form>
//   );
// }
// //     import { useForm } from "react-hook-form";
// // import { InputText } from 'primereact/inputtext';


// // export default function StudentRegistration(props) {
// //     const { register, handleSubmit, formState: { errors } } = useForm();



// //     return (
// //         <form onSubmit={handleSubmit(onSubmit)}>
// //             <div className="field grid">
// //                 <label htmlFor="userName" className="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10">שם משתמש:</label>
// //                 <div className="col">
// //                     <InputText {...register("userName", { required: "This field is required", maxLength: 20 })} />
// //                     {errors.userName && <p className="error">{errors.userName.message}</p>}
// //                 </div>
// //             </div>
// //             <div className="field grid">
// //                 <label htmlFor="name" className="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10">שם:</label>
// //                 <div className="col">
// //                     <InputText {...register("name", {
// //                         required: "This field is required",
// //                     })} />
// //                     {errors.name && <p className="error">{errors.name.message}</p>}
// //                 </div>
// //             </div>
// //             <div className="field grid">
// //                 <label htmlFor="password" className="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10">סיסמא:</label>
// //                 <div className="col">
// //                     <InputText type="password" {...register("password", { required: "This field is required" })} />
// //                     {errors.password && <p className="error">{errors.password.message}</p>}
// //                 </div>
// //             </div>
// //             <div className="field grid">
// //                 <label htmlFor="email" className="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10">אימייל:</label>
// //                 <div className="col">
// //                     <InputText type="email" {...register("email", {
// //                         required: "This field is required",
// //                         pattern: {
// //                             value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
// //                             message: 'Invalid email address',
// //                         }
// //                     })} />
// //                     {errors.email && <p className="error">{errors.email.message}</p>}
// //                 </div>
// //             </div>
// //             <div className="field grid">
// //                 <label htmlFor="phone" className="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10">פלאפון:</label>
// //                 <div className="col">
// //                     <InputText {...register("phone", {
// //                         required: "This field is required",
// //                         pattern: {
// //                             value: /^(?:\+?\d{1,3})?[-.\s]?(\(?\d{3}\)?)[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
// //                             message: 'Invalid phone number format',
// //                         }
// //                     })} />
// //                     {errors.phone && <p className="error">{errors.phone.message}</p>}
// //                 </div>
// //             </div>

// //             <input type="submit" />
// //         </form>
// //     );
// // }
import axios from "axios";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import { Password } from 'primereact/password';

export default function StudentRegistration(props) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { token } = useSelector((state) => state.token);
  const [selectedClass, setSelectedClass] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post('http://localhost:7000/api/students', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 201) {
        console.log(res.data);
      }
      if(res.status===409){
        alert("שם משתמש קיים במערכת");
      }
      props.closeDialog();
    } catch (error) {
      console.error("Error during submission:", error);
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
        <InputText id="name" {...register("name", { required: true })} />
        {errors.name && <small className="p-error">שם הוא שדה חובה.</small>}
      </div>
      <div className="field">
        <label htmlFor="userName">שם משתמש</label>
        <InputText id="userName" {...register("userName", { required: true })} />
        {errors.userName && <small className="p-error">שם משתמש הוא שדה חובה.</small>}
      </div>
      <div className="field">
                <label htmlFor="password">סיסמא</label>
                <InputText
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    {...register("password", {
                        required: "סיסמא היא שדה חובה.",
                        minLength: {
                            value: 8,
                            message: "הסיסמא חייבת להיות באורך של לפחות 8 תווים."
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                            message: "הסיסמא חייבת לכלול לפחות אות גדולה, אות קטנה ומספר."
                        }
                    })}
                />
                <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? "Hide" : "Show"}
                </button>
                {errors.password && <small className="p-error">{errors.password.message}</small>}
            </div>
      <div className="field">
        <label htmlFor="email">מייל</label>
        <InputText id="email" type="email" {...register("email", {
          required: "מייל הוא שדה חובה.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "כתובת מייל אינה תקינה."
          }
        })} />
        {errors.email && <small className="p-error">{errors.email.message}</small>}
      </div>
      <div className="field">
        <label htmlFor="phone">מספר טלפון</label>
        <InputText id="phone" type="tel" {...register("phone", {
          required: "מספר טלפון הוא שדה חובה.",
          pattern: {
            value: /^(?:\d{9}|\d{10})$/,
            message: "מספר טלפון חייב להיות באורך של 9 או 10 ספרות."
            
            }
        })} />
        {errors.phone && <small className="p-error">{errors.phone.message}</small>}
      </div>
      <div className="field">
        <label htmlFor="class">כיתה</label>
        <Dropdown
          id="class"
          options={classes}
          {...register("yearbook", { required: true })}
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.value);
            setValue("class", e.value); // Update form state
          }}
        />
        {errors.class && <small className="p-error">כיתה היא שדה חובה.</small>}
      </div>
      <div className="field">
        <label htmlFor="classNumber">מספר כיתה</label>
        <InputText id="classNumber" {...register("numClass", { required: true })}
          onChange={(e) => {
            const valueAsNumber = Number(e.target.value);
            if (!isNaN(valueAsNumber)) {
              setValue("classNumber", valueAsNumber);
            } else {
              setValue("classNumber", "");
            }
          }}
        />
        {errors.classNumber && <small className="p-error">מספר כיתה הוא שדה חובה.</small>}
      </div>
      <Button type="submit" label="שלח" />
    </form>
  );
}