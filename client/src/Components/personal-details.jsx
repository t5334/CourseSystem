
import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";
import UpdateDetailsForm from "./UpdateDetailsForm";
import { useSelector } from "react-redux";
import axios from "axios";

const PersonalDetailsCard = () => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [classInfo, setClassInfo] = useState({ studentId:"",class: "", classNumber: "" }); // State for class and class number
  const { user, token } = useSelector((state) => state.token);

  const fetchStudentDetails = async () => {
    try {
      if (!user || !user._id) {
        console.error("User ID is not defined");
        return;
      }

      const res = await axios.get(`http://localhost:7000/api/students/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        console.log("Student data fetched successfully:", res.data);
        setClassInfo({
          studentId: res.data._id,
          class: res.data.yearbook || "",
          classNumber: res.data.numClass || "",
        });
      } else {
        console.error("Failed to fetch student data. Status:", res.status);
      }
    } catch (error) {
      console.error("Error fetching student data:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, []); // Run once on component mount

  return (
    <div
      className="p-d-flex"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "2rem",
        padding: "1rem",
        background: "linear-gradient(to bottom, #f9f9f9, #e0f7fa)",
      }}
    >
      {/* Personal Details Card */}
      <div
        className="p-d-flex p-flex-column p-ai-center p-jc-center"
        style={{
          flex: "1",
          maxWidth: "500px",
          textAlign: "right",
        }}
      >
        <h2 style={{ color: "#007bff", marginBottom: "0.5rem" }}>{user.name}</h2>
        <Tag
          value={user.role}
          severity="info"
          style={{
            backgroundColor: "#ff6347",
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        />

        <Card
          title={<span style={{ color: "#007bff", textAlign: "center" }}>פרטים אישיים</span>}
          style={{
            width: "100%",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            textAlign: "right",
            backgroundColor: "#ffffff",
          }}
          footer={
            <div className="p-d-flex p-jc-center">
              <Button
                label="עדכן פרטים"
                icon="pi pi-pencil"
                className="p-button-primary"
                style={{ fontSize: "1rem", padding: "0.5rem 1.5rem" }}
                onClick={() => setShowUpdateForm(true)}
              />
            </div>
          }
        >
          <div
            className="p-d-flex p-flex-column"
            style={{
              gap: "1.5rem",
              fontSize: "1.1rem",
              color: "#333",
              direction: "rtl",
            }}
          >
            {/* Common Fields */}
            <div>
              <strong style={{ color: "#007bff" }}>שם משתמש:</strong>
              <p style={{ margin: "0.2rem 0 0" }}>{user.userName || ""}</p>
            </div>
            <Divider />
            <div>
              <strong style={{ color: "#007bff" }}>אימייל:</strong>
              <p style={{ margin: "0.2rem 0 0" }}>{user.email || ""}</p>
            </div>
            <Divider />
            <div>
              <strong style={{ color: "#007bff" }}>טלפון:</strong>
              <p style={{ margin: "0.2rem 0 0" }}>{user.phone || ""}</p>
            </div>

            {/* Conditional Fields for Students */}
            {user.role === "Student" && (
              <>
                <Divider />
                <div>
                  <strong style={{ color: "#007bff" }}>כיתה:</strong>
                  <p style={{ margin: "0.2rem 0 0" }}>{classInfo.class || "N/A"}</p>
                </div>
                <Divider />
                <div>
                  <strong style={{ color: "#007bff" }}>מספר כיתה:</strong>
                  <p style={{ margin: "0.2rem 0 0" }}>{classInfo.classNumber || "N/A"}</p>
                </div>
              </>
            )}
            
          </div>
        </Card>
      </div>

      {/* Update Details Form */}
      {showUpdateForm && (
        <div
          style={{
            flex: "1",
            maxWidth: "500px",
          }}
        >
          <UpdateDetailsForm
            user={user}
            info={classInfo}
            onSubmit={(updatedData) => {
              console.log("Updated Data:", updatedData);
              setShowUpdateForm(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PersonalDetailsCard;