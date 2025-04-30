import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";
import UpdateDetailsForm from "./UpdateDetailsForm"; // Import the UpdateDetailsForm component

const PersonalDetailsCard = ({ user }) => {
  // State to toggle the visibility of the update form
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // Example user data (replace this with actual data from props or API)
  const userData = user || {
    username: "yossi123",
    name: "יוסי כהן",
    phone: "050-1234567",
    email: "yossi@example.com",
    role: "תלמיד", // "מורה" (Teacher) or "תלמיד" (Student)
    bank: "בנק הפועלים", // Only for teachers
    accountNumber: "123456789", // Only for teachers
    accountHolder: "יוסי כהן", // Only for teachers
    class: "יב 3", // Only for students
    classNumber: "12", // Only for students
  };

  return (
    <div
      className="p-d-flex"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "row", // Align items horizontally
        alignItems: "flex-start", // Align items by the top
        justifyContent: "center", // Center items horizontally in the container
        gap: "2rem", // Add space between the two components
        padding: "1rem",
        background: "linear-gradient(to bottom, #f9f9f9, #e0f7fa)", // Background gradient
      }}
    >
      {/* Personal Details Card */}
      <div
        className="p-d-flex p-flex-column p-ai-center p-jc-center"
        style={{
          flex: "1", // Take up equal space with the form
          maxWidth: "500px", // Optional: Limit the width
          textAlign: "right",
        }}
      >
        <h2 style={{ color: "#007bff", marginBottom: "0.5rem" }}>{userData.name}</h2>
        <Tag
          value={userData.role}
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
                onClick={() => setShowUpdateForm(true)} // Show the update form
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
              <p style={{ margin: "0.2rem 0 0" }}>{userData.username}</p>
            </div>
            <Divider />
            <div>
              <strong style={{ color: "#007bff" }}>אימייל:</strong>
              <p style={{ margin: "0.2rem 0 0" }}>{userData.email}</p>
            </div>
            <Divider />
            <div>
              <strong style={{ color: "#007bff" }}>טלפון:</strong>
              <p style={{ margin: "0.2rem 0 0" }}>{userData.phone}</p>
            </div>

            {/* Conditional Fields for Teachers */}
            {userData.role === "מורה" && (
              <>
                <Divider />
                <div>
                  <strong style={{ color: "#007bff" }}>בנק:</strong>
                  <p style={{ margin: "0.2rem 0 0" }}>{userData.bank}</p>
                </div>
                <Divider />
                <div>
                  <strong style={{ color: "#007bff" }}>מספר חשבון:</strong>
                  <p style={{ margin: "0.2rem 0 0" }}>{userData.accountNumber}</p>
                </div>
                <Divider />
                <div>
                  <strong style={{ color: "#007bff" }}>שם בעל החשבון:</strong>
                  <p style={{ margin: "0.2rem 0 0" }}>{userData.accountHolder}</p>
                </div>
              </>
            )}

            {/* Conditional Fields for Students */}
            {userData.role === "תלמיד" && (
              <>
                <Divider />
                <div>
                  <strong style={{ color: "#007bff" }}>כיתה:</strong>
                  <p style={{ margin: "0.2rem 0 0" }}>{userData.class}</p>
                </div>
                <Divider />
                <div>
                  <strong style={{ color: "#007bff" }}>מספר כיתה:</strong>
                  <p style={{ margin: "0.2rem 0 0" }}>{userData.classNumber}</p>
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
            flex: "1", // Take up equal space with the card
            maxWidth: "500px", // Optional: Limit the width
          }}
        >
          <UpdateDetailsForm
            user={userData}
            onSubmit={(updatedData) => {
              console.log("Updated Data:", updatedData);
              setShowUpdateForm(false); // Hide the form after submission
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PersonalDetailsCard;