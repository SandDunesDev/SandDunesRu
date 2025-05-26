import React, { useState, useEffect } from "react";
import "./App.css";
import "./PopUp.css";
import ImageSwitcherController from "./ImageSwitcherController";
import RunningLine from "./RunningLine";
import EmailInput from "./EmailInput";

function App() {
  const [selectedImageA, setSelectedImageA] = useState("");
  const [selectedImageB, setSelectedImageB] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <div style={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100vw",
      height: "calc(var(--vh, 1vh) * 100)",
      backgroundColor: "#fff",
    }}>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 10 }}>
        <RunningLine />
      </div>

      <div style={{ width: "100%", height: "100%" }}>
        <ImageSwitcherController
          setSelectedImageA={setSelectedImageA}
          setSelectedImageB={setSelectedImageB}
        />
      </div>

      <div className="emailInputContainer">
        <EmailInput
          selectedImageA={selectedImageA}
          selectedImageB={selectedImageB}
          onSuccess={() => setShowPopup(true)}
        />
      </div>

      {showPopup && (
        <div style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100vw",
          height: "calc(var(--vh, 1vh) * 100)",
          backgroundColor: "rgba(37,37,37,0.7)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
        }}>
          <div className="popUpWrapper">
            <div className="popUpContainer">
              Открытка и&nbsp;11% на&nbsp;первый заказ отправлены на&nbsp;почту!
            </div>
            <button className="popUpButton" onClick={() => setShowPopup(false)}>
              <span className="popUpButtonImage" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
