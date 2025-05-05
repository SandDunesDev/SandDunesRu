import React, { useState } from "react";

export default function EmailInput({ selectedImageA, selectedImageB, onSuccess }) {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email) return;

    try {
      // Simulate backend call
      console.log("Sending to backend:", { email, selectedImageA, selectedImageB });

      // Example POST to backend:
      // await fetch("/api/send-email", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, selectedImageA, selectedImageB })
      // });

      onSuccess();  // trigger popup
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
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          padding: "12px 16px",
          fontSize: "16px",
          outline: "none",
          fontFamily: "Inter, sans-serif",
          fontWeight: "Regular",
          color: "#999999",
        }}
      />
      <div style={{ width: "2px", backgroundColor: "#fff", height: "70%" }} />
      <button
        onClick={handleSubmit}
        style={{
          background: "transparent",
          border: "none",
          padding: "0 16px",
          cursor: "pointer",
          fontSize: "16px",
          fontFamily: "Inter, sans-serif",
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        S*nd
      </button>
    </div>
  );
}
