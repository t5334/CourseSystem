import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setToken, logOut } from '../redux/tokenSlice'

const UpdateDetailsForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const {token,user} = useSelector((state) => state.token);
  const [formData, setFormData] = useState({
    id: user.studentId || user.teacherId || user._id || "",
    username: user.username || "",
    name: user.name || "",
    phone: user.phone || "",
    email: user.email || "",
    bank: user.bank || "",
    accountNumber: user.accountNumber || "",
    accountHolder: user.accountHolder || "",
    yearbook: user.class || "",
    numClass: user.classNumber || "",
    role : user.role || "",
    userId: user._id || "",
    userName: user.userName || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    console.log("Submitting form with data:", formData);
    // console.log(formData);
    e.preventDefault();
    //if (onSubmit) {
      onSubmit(formData);
      //console.log("Updated Data:", formData);
      if(user.role === "Teacher"){
        console.log(formData);
        const updateTeacher =await axios.put('http://localhost:7000/api/teachers',formData,{headers:{Authorization:`Bearer ${token}`}})
        console.log(updateTeacher);
        if(updateTeacher.status === 200){
          dispatch(setToken({token:token,user:{...updateTeacher.data.userId,teacherId:updateTeacher.data._id,bank:updateTeacher.data.account.bank,accountNumber:updateTeacher.data.account.acccount,accountHolder:updateTeacher.data.account.holder}}))
          console.log("user after"+user);
          alert("פרטים עודכנו בהצלחה")
        }
      }
      if(user.role === "Student"){
        console.log(formData);
        const updatedStudent =await axios.put('http://localhost:7000/api/students',formData,{headers:{Authorization:`Bearer ${token}`}})
        console.log(updatedStudent.data);
        if(updatedStudent.status === 200){
          dispatch(setToken({token:token,user:{...updatedStudent.data.userId,studentId:updatedStudent.data._id,classNumber:updatedStudent.data.numClass,class:updatedStudent.data.yearbook}}))
          alert("פרטים עודכנו בהצלחה")
        }
    }
  };

  return (
    <Card
      title={<span style={{ color: "#007bff" }}>עדכון פרטים</span>}
      style={{
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        textAlign: "right",
      }}
    >
      <form onSubmit={handleSubmit} className="p-fluid" style={{ direction: "rtl" }}>
        {/* Name */}
        <div className="p-field">
          <label htmlFor="name" style={{ fontWeight: "bold", color: "#007bff" }}>
            שם
          </label>
          <InputText
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="הזן שם מלא"
          />
        </div>
        <Divider />
        {/* Phone */}
        <div className="p-field">
          <label htmlFor="phone" style={{ fontWeight: "bold", color: "#007bff" }}>
            טלפון
          </label>
          <InputText
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="הזן מספר טלפון"
          />
        </div>
        <Divider />
        {/* Email */}
        <div className="p-field">
          <label htmlFor="email" style={{ fontWeight: "bold", color: "#007bff" }}>
            אימייל
          </label>
          <InputText
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="הזן כתובת אימייל"
          />
        </div>
        <Divider />
        {/* Additional Fields for Teachers */}
        {user.role === "Teacher" && (
          <>
            <div className="p-field">
              <label htmlFor="bank" style={{ fontWeight: "bold", color: "#007bff" }}>
                בנק
              </label>
              <InputText
                id="bank"
                name="bank"
                value={formData.bank}
                onChange={handleInputChange}
                placeholder="הזן שם בנק"
              />
            </div>
            <Divider />
            <div className="p-field">
              <label htmlFor="accountNumber" style={{ fontWeight: "bold", color: "#007bff" }}>
                מספר חשבון
              </label>
              <InputText
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                placeholder="הזן מספר חשבון"
              />
            </div>
            <Divider />
            <div className="p-field">
              <label htmlFor="accountHolder" style={{ fontWeight: "bold", color: "#007bff" }}>
                שם בעל החשבון
              </label>
              <InputText
                id="accountHolder"
                name="accountHolder"
                value={formData.accountHolder}
                onChange={handleInputChange}
                placeholder="הזן שם בעל החשבון"
              />
            </div>
          </>
        )}
        {/* Additional Fields for Students */}
        {user.role === "Student" && (
          <>
            <div className="p-field">
              <label htmlFor="yearbook" style={{ fontWeight: "bold", color: "#007bff" }}>
                כיתה
              </label>
              <InputText
                id="yearbook"
                name="yearbook"
                value={formData.yearbook}
                onChange={handleInputChange}
                placeholder="הזן כיתה"
              />
            </div>
            <Divider />
            <div className="p-field">
              <label htmlFor="numClass" style={{ fontWeight: "bold", color: "#007bff" }}>
                מספר כיתה
              </label>
              <InputText
                id="numClass"
                name="numClass"
                value={formData.numClass}
                onChange={handleInputChange}
                placeholder="הזן מספר כיתה"
              />
            </div>
          </>
        )}
        <Divider />
        {/* Submit Button */}
        <div className="p-d-flex p-jc-center">
          <Button type="submit" label="עדכן פרטים" icon="pi pi-check" className="p-button-success" />
        </div>
      </form>
    </Card>
  );
};

export default UpdateDetailsForm;