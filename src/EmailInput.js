import React, { useState } from "react";
import "./EmailInput.css";

import btnDefault from "../src/ButtonDefault.svg";
import btnFocused from "../src/ButtonFocused.svg";
import btnClicked from "../src/ButtonClicked.svg";
import spinner from "../src/spinner.svg";

export default function EmailInput({ selectedImageA, selectedImageB, onSuccess }) {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [clicked, setClicked] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    if (!email || !validateEmail(email)) {
      setHasError(true);
      return;
    }

    if (!selectedImageA || !selectedImageB) {
      return;
    }

    setClicked(true);
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
      // небольшая задержка для видимости клика
      setTimeout(() => setClicked(false), 300);
    }
  };

  const getButtonImage = () => {
    if (loading) return spinner;
    if (clicked) return btnClicked;
    if (isHovered || isFocused) return btnFocused;
    return btnDefault;
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
        className="send-button"
        onClick={handleSubmit}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={loading}
      >
        <img
          src={getButtonImage()}
          alt="Send"
          className={loading ? "spinner" : "button-image"}
        />
      </button>
    </div>
  );
}
