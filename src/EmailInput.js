import React, { useState } from "react";
import "./EmailInput.css";

import btnDefault from "./ButtonDefault.svg";
import btnFocused from "./ButtonFocused.svg";
import btnClicked from "./ButtonClicked.svg";

import spinnerPng from "./spinner.png";  

export default function EmailInput({ selectedImageA, selectedImageB, onSuccess }) {
  const [email, setEmail] = useState("");
  const [setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [clicked, setClicked] = useState(false);

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const handleSubmit = async () => {
    if (!email || !validateEmail(email)) {
      setHasError(true);
      return;
    }
    if (!selectedImageA || !selectedImageB) return;

    setClicked(true);
    setLoading(true);

    try {
      const response = await fetch("/api/send-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, selectedImageA, selectedImageB }),
      });
      const result = await response.json();

      if (response.ok && !result.error) {
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
      setTimeout(() => setClicked(false), 300);
    }
  };

  const getButtonImage = () => {
    if (clicked) return btnClicked;
    if (isHovered) return btnFocused;
    return btnDefault;
  };

  return (
    <div className="email-block">
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
          className="send-button"
          onClick={handleSubmit}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={loading}
          aria-label="Send"
        >
          {loading ? (
  <img src={spinnerPng} alt="Loading" className="spinner" />

) : (
  <img
    src={getButtonImage()}
    alt="Send"
    className="button-image"
    draggable={false}
  />
)}
        </button>
      </div>
    </div>
  );
}
