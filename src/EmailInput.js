import React, { useState } from "react";
import "./EmailInput.css";

export default function EmailInput({ selectedImageA, selectedImageB, onSuccess }) {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !selectedImageA || !selectedImageB) return;

    setLoading(true);

    try {
      const response = await fetch("/api/send-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, selectedImageA, selectedImageB }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setEmail("");
        onSuccess();
      } else {
        alert("Sending failed. Try again.");
      }
    } catch (err) {
      alert("Failed to send. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
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
      <button className="send-button" onClick={handleSubmit} disabled={loading}>
        <span className={`send-icon ${loading ? "loading" : ""}`} />
      </button>
    </div>
  );
}
