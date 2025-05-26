import React, { useState, useEffect } from "react";
// ELIMINADO: ReactDOM ya no es necesario aquí si el modal se mueve
import "./EmailInput.css";

import btnDefault from "../src/ButtonDefault.svg";
import btnFocused from "../src/ButtonFocused.svg";
import btnClicked from "../src/ButtonClicked.svg";
import spinner from "../src/spinner.svg";
// ELIMINADO: crossIcon ya no es necesario aquí
// ELIMINADO: SimpleBar y su CSS ya no son necesarios aquí

export default function EmailInput({ selectedImageA, selectedImageB, onSuccess }) {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false); // CORREGIDO: Nombre de variable de estado
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [clicked, setClicked] = useState(false);
  // ELIMINADO: Estado y useEffect para showModal y la clase 'modal-open' del body

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

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
    if (loading) return spinner;
    if (clicked) return btnClicked;
    if (isHovered) return btnFocused;
    return btnDefault;
  };

  return (
    // Eliminado el Fragment <> innecesario si solo hay un div principal
    <div className="email-block">
      <div className="email-input-wrapper">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => { setIsFocused(true); setHasError(false); }}
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
      {/* ELIMINADO: El <p className="privacy-consent-text">...</p> ya no va aquí */}
      {/* ELIMINADO: El bloque {showModal && ReactDOM.createPortal(...)} ya no va aquí */}
    </div>
  );
}