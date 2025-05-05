import React, { useState } from "react";
import "./EmailInput.css";

export default function EmailInput({ selectedImageA, selectedImageB, onSuccess }) {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;

    try {
      console.log("Sending to backend:", { email, selectedImageA, selectedImageB });
      onSuccess();
    } catch (err) {
      alert("Failed to send. Try again.");
    }
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      border: "2px solid #fff",
      borderRadius: "0px",
      overflow: "hidden",
      background: "#242324",
      height: "48px",
      width: "100%",
    }}>
      <input
        type="email"
        placeholder={isFocused ? "" : "email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          padding: "12px 16px",
          fontSize: "16px",
          outline: "none",
          fontFamily: "Inter, sans-serif",
          fontWeight: "Regular",
          color: isFocused ? "#ffffff" : "#999999",
        }}
      />
      <div style={{ width: "2px", backgroundColor: "#fff", height: "70%" }} />
      <button className="send-button" onClick={handleSubmit}>
        <span className="send-icon" />
      </button>

    </div>
  );
}
