import React, { useState } from "react";
import "./App.css";
import "./PopUp.css";
import ImageSwitcherController from "./ImageSwitcherController";
import RunningLine from "./RunningLine";
import EmailInput from "./EmailInput";

function App() {
  const [selectedImageA, setSelectedImageA] = useState("");
  const [selectedImageB, setSelectedImageB] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div style={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100vw",
      height: "100vh",
      backgroundColor: "#fff",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 10 }}>
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
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
        }}>
          <div className="popUpContainer">
            <div className="popUpText">
              We have sent you some DuNes!
              Check your inbox
            </div>
          <button className="popUpButton" onClick={() => setShowPopup(false)} >
          <span className="popUpButtonImage" />
          </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
