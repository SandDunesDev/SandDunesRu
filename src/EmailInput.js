import React, { useState } from "react";
import "./EmailInput.css";

export default function EmailInput({ selectedImageA, selectedImageB, onSuccess }) {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [clicked, setClicked] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    setClicked(true);

    if (!email) {
      setHasError(true);
      setClicked(false);
      return;
    }

    if (!validateEmail(email)) {
      setHasError(true);
      setClicked(false);
      return;
    } else {
      setHasError(false);
    }

    if (!selectedImageA || !selectedImageB) {
      setClicked(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/send-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, selectedImageA, selectedImageB }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setEmail("");
        setHasError(false);
        onSuccess();
      } else {
        alert("Sending failed. Try again.");
      }
    } catch (err) {
      alert("Failed to send. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
      setClicked(false);
    }
  };

  return (
    <div className="email-input-wrapper">
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => {
          setIsFocused(true);
          setHasError(false);
        }}
        onBlur={() => setIsFocused(false)}
        className={`email-input ${hasError ? "error" : ""}`}
      />
      <div className="divider" />
      <button
        className={`send-button 
          ${loading ? "loading" : ""}
          ${clicked && !loading ? "clicked" : ""}
        `}
        onClick={handleSubmit}
        disabled={loading}
      >
        {!loading ? (
          <span className="send-icon" />
        ) : (
          <span className="spinner" />
        )}
      </button>
    </div>
  );
}
