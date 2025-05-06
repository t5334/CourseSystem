
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { Password } from 'primereact/password';
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
  const {token} = useSelector((state) => state.token);
    const onSubmit = (data) => {
      const formattedData = {
          ...data,
          "מספר חשבון": Number(data["מספר חשבון"]), // Force conversion to number
      };
      
       // Check if "מספר חשבון" is now a number
      // Proceed with submission logic...
  };

  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}
  >
    <div className="field" style={{ width: '100%' }}>
      <label htmlFor="name">שם</label>
      <InputText
        id="name"
        style={{ width: '100%' }}
        {...register("שם", { required: true })}
      />
      {errors.שם && <small className="p-error">שם הוא שדה חובה.</small>}
    </div>

    <div className="field" style={{ width: '100%' }}>
      <label htmlFor="username">שם משתמש</label>
      <InputText
        id="username"
        style={{ width: '100%' }}
        {...register("שם משתמש", { required: true })}
      />
      {errors["שם משתמש"] && <small className="p-error">שם משתמש הוא שדה חובה.</small>}
    </div>

    <div className="field" style={{ width: '100%' }}>
      <label htmlFor="password">סיסמא</label>
      <Password
        id="password"
        style={{ width: '100%' }}
        toggleMask
        feedback={true}
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
      {errors["password"] && <small className="p-error">{errors["password"].message}</small>}
    </div>

    <div className="field" style={{ width: '100%' }}>
      <label htmlFor="email">מייל</label>
      <InputText
        id="email"
        style={{ width: '100%' }}
        type="email"
        {...register("מייל", {
          required: "מייל הוא שדה חובה.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "כתובת מייל אינה תקינה."
          }
        })}
      />
      {errors.מייל && <small className="p-error">{errors["מייל"].message}</small>}
    </div>

    <div className="field" style={{ width: '100%' }}>
      <label htmlFor="phone">מספר טלפון</label>
      <InputText
        id="phone"
        style={{ width: '100%' }}
        type="tel"
        {...register("מספר טלפון", {
          required: "מספר טלפון הוא שדה חובה.",
          pattern: {
            value: /^[0-9]{9}$/,
            message: "מספר טלפון חייב להיות באורך של 9-10 ספרות."
          }
        })}
      />
      {errors["מספר טלפון"] && <small className="p-error">{errors["מספר טלפון"].message}</small>}
    </div>

    <div className="field" style={{ width: '100%' }}>
      <label htmlFor="בנק">בנק</label>
      <Dropdown
        id="בנק"
        style={{ width: '100%' }}
        options={banks}
        optionLabel="name"
        value={selectedBank}
        placeholder="בחר בנק"
        {...register("בנק")}
        onChange={(e) => {
          setValue("בנק", e.value);
          setSelectedBank(e.value);
        }}
      />
      {errors["בנק"] && <small className="p-error">{errors["בנק"].message}</small>}
    </div>

    <div className="field" style={{ width: '100%' }}>
      <label htmlFor="מספר חשבון">מספר חשבון</label>
      <InputText
        id="מספר חשבון"
        style={{ width: '100%' }}
        {...register("מספר חשבון")}
        onChange={(e) => {
          const valueAsNumber = Number(e.target.value);
          if (!isNaN(valueAsNumber)) {
            setValue("מספר חשבון", valueAsNumber);
          } else {
            setValue("מספר חשבון", "");
          }
        }}
      />
      {errors["מספר חשבון"] && <small className="p-error">{errors["מספר חשבון"].message}</small>}
    </div>

    <div className="field" style={{ width: '100%' }}>
      <label htmlFor="שם בעל חשבון">שם בעל חשבון</label>
      <InputText
        id="שם בעל חשבון"
        style={{ width: '100%' }}
        {...register("שם בעל חשבון")}
      />
    </div>

    <Button type="submit" label="שלח" style={{ width: '100%' }} />
  </form>
  );
}