import axios from "axios";

//const res = await axios.post('http://localhost:7000/api/auth/register', data)

import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="שם" {...register} />
      <input type="text" placeholder="שם משתמש" {...register("שם משתמש", {required: true})} />
      <input type="password" placeholder="סיסמא" {...register("סיסמא", {required: true})} />
      <input type="email" placeholder="מייל" {...register("מייל", {required: true})} />
      <input type="tel" placeholder="מספר פלאפון" {...register("מספר פלאפון", {required: true})} />
      <select {...register("בנק")}>
        <option value="11 דיסקונט">11 דיסקונט</option>
      </select>
      <input type="number" placeholder="מספר חשבון" {...register} />
      <input type="text" placeholder="שם בעל חשבון" {...register} />

      <input type="submit" />
    </form>
  );
}