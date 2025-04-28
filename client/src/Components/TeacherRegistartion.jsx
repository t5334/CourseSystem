// import axios from "axios";

// //const res = await axios.post('http://localhost:7000/api/auth/register', data)

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';

// export default function App() {
//   const [bank,setBanks]=useState([])
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const onSubmit = data => console.log(data);
//   console.log(errors);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input type="text" placeholder="שם" {...register} />
//       <input type="text" placeholder="שם משתמש" {...register("שם משתמש", {required: true})} />
//       <input type="password" placeholder="סיסמא" {...register("סיסמא", {required: true})} />
//       <input type="email" placeholder="מייל" {...register("מייל", {required: true})} />
//       <input type="tel" placeholder="מספר פלאפון" {...register("מספר פלאפון", {required: true})} />
//       <select {...register("בנק")}>
//         <option value="11 דיסקונט">11 דיסקונט</option>
//       </select>
//       <input type="number" placeholder="מספר חשבון" {...register} />
//       <input type="text" placeholder="שם בעל חשבון" {...register} />

//       <input type="submit" />
//     </form>
//   );
// }
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
//import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const banks = [
  { name: '11 דיסקונט', code: '11' },
  { name: '12 הפועלים', code: '12' },
  { name: '13 לאומי', code: '13' },
  { name: '14 מזרחי טפחות', code: '14' },
  { name: '20 ביטוח לאומי', code: '20' },
  { name: '19 אגם', code: '19' }
];

export default function App() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [selectedBank, setSelectedBank] = useState(null); // State for selected bank
    const onSubmit = (data) => {
      const formattedData = {
          ...data,
          "מספר חשבון": Number(data["מספר חשבון"]), // Force conversion to number
      };
      
      console.log(formattedData); // Check if "מספר חשבון" is now a number
      // Proceed with submission logic...
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <label htmlFor="שם">שם</label>
      <InputText id="שם" {...register("שם")} />
      {errors.שם && <span>שם הוא שדה חובה</span>}

      <label htmlFor="שם משתמש">שם משתמש</label>
      <InputText id="שם משתמש" {...register("שם משתמש", { required: true })} />
      {errors["שם משתמש"] && <span>שם משתמש הוא שדה חובה</span>}

      <label htmlFor="סיסמא">סיסמא</label>
      <InputText type="password" id="סיסמא" {...register("סיסמא", { required: true })} />
      {errors.סיסמא && <span>סיסמא היא שדה חובה</span>}

      <label htmlFor="מייל">מייל</label>
      <InputText type="email" id="מייל" {...register("מייל", { required: true })} />
      {errors.מייל && <span>מייל הוא שדה חובה</span>}

      <label htmlFor="מספר פלאפון">מספר פלאפון</label>
      <InputText type="tel" id="מספר פלאפון" {...register("מספר פלאפון", { required: true })} />
      {errors["מספר פלאפון"] && <span>מספר פלאפון הוא שדה חובה</span>}

      <label htmlFor="בנק">בנק</label>
      <Dropdown
        id="בנק"
        options={banks}
        optionLabel="name"
        value={selectedBank}
        placeholder="בחר בנק"
        {...register("בנק", { required: true })}
        onChange={(e) => {
          setValue("בנק", e.value);
          setSelectedBank(e.value); // Check if e.value is correct
          console.log("Selected bank changed:", e.value); // Log for debugging
        }}
      />
      {errors.בנק && <span>בחירת בנק היא שדה חובה</span>}

      <label htmlFor="מספר חשבון">מספר חשבון</label>
      <InputText
        id="מספר חשבון"
        {...register("מספר חשבון", { required: true })}
        // onChange={(e) => {
        //   // Convert to number
        //   const valueAsNumber = Number(e.target.value); // Converts the string to a number
        //   setValue("מספר חשבון", valueAsNumber);// Save as number in form state
        // }}
        onChange={(e) => {
          const valueAsNumber = Number(e.target.value); // Convert input value to number
          // Check if the conversion is a valid number
          if (!isNaN(valueAsNumber)) {
              setValue("מספר חשבון", valueAsNumber); // Set as number in form state
          } else {
              setValue("מספר חשבון", ""); // Clear invalid input or set as needed
          }
          console.log("Current value:", valueAsNumber, "Type:", typeof valueAsNumber);
      }} 
        mode="decimal"
      />
      {errors["מספר חשבון"] && <span>מספר חשבון הוא שדה חובה</span>}

      <label htmlFor="שם בעל חשבון">שם בעל חשבון</label>
      <InputText id="שם בעל חשבון" {...register("שם בעל חשבון")} />

      <Button type="submit" label="שלח" />
    </form>
  );
}