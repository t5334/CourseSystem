
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { Password } from 'primereact/password';
import axios from 'axios';
const banks = [
  { name: '11 דיסקונט', code: '11' },
  { name: '12 הפועלים', code: '12' },
  { name: '13 לאומי', code: '13' },
  { name: '14 מזרחי טפחות', code: '14' },
  { name: '20 ביטוח לאומי', code: '20' },
  { name: '19 אגם', code: '19' }
];

export default function App(props) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [selectedBank, setSelectedBank] = useState(null); // State for selected bank
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {token} = useSelector((state) => state.token);
    const onSubmit =  async(data) => {
      const formattedData = {
          ...data,
          "מספר חשבון": Number(data["מספר חשבון"]), // Force conversion to number
          
      };
      console.log(data);
      try {
        const res = await axios.post('http://localhost:7000/api/teachers', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 201) {
          console.log(res.data);
        }
        props.closeDialog();
      } catch (error) {
        console.error("Error during submission:", error);
      }
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
        {...register("name", { required: true })}
      />
      {errors.שם && <small className="p-error">שם הוא שדה חובה.</small>}
    </div>

    <div className="field" style={{ width: '100%' }}>
      <label htmlFor="username">שם משתמש</label>
      <InputText
        id="username"
        style={{ width: '100%' }}
        {...register("userName", { required: true })}
      />
      {errors["שם משתמש"] && <small className="p-error">שם משתמש הוא שדה חובה.</small>}
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

    <div className="field" style={{ width: '100%' }}>
      <label htmlFor="email">מייל</label>
      <InputText
        id="email"
        style={{ width: '100%' }}
        type="email"
        {...register("email", {
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
        {...register("phone", {
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
    optionLabel="name" // Display the "name" in the dropdown
    value={selectedBank} // The selected value object
    placeholder="בחר בנק"
    {...register("bank", {
      setValueAs: (value) => parseInt(value, 10), // Convert the value to a number
    })}
    onChange={(e) => {
      setValue("bank", parseInt(e.value.code, 10)); // Set the form value as a number
      setSelectedBank(e.value); // Update the selected bank
    }}
  />
  {errors["bank"] && <small className="p-error">{errors["bank"].message}</small>}
</div>

    <div className="field" style={{ width: '100%' }}>
      <label htmlFor="מספר חשבון">מספר חשבון</label>
      <InputText
        id="מספר חשבון"
        style={{ width: '100%' }}
        {...register("acccount")}
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
        {...register("holder")}
      />
    </div>

    <Button type="submit" label="שלח" style={{ width: '100%' }} />
  </form>
  );
}