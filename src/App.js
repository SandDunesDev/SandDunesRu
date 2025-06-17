import React, { useState, useEffect } from "react";
import "./App.css";
import "./PopUp.css";
import ImageSwitcherController from "./ImageSwitcherController";
import RunningLine from "./RunningLine";
import EmailInput from "./EmailInput";

/* ───────────────── Imágenes a precargar ────────────────── */
import Img01 from "./images/1x/left/left01.png";
import Img02 from "./images/1x/left/left02.png";
import Img03 from "./images/1x/left/left03.png";
import Img04 from "./images/1x/left/left04.png";

import Pic01 from "./images/1x/right/right01.webp";
import Pic02 from "./images/1x/right/right02.webp";
import Pic03 from "./images/1x/right/right03.webp";
import Pic04 from "./images/1x/right/right04.webp";
import Pic05 from "./images/1x/right/right05.webp";
import Pic06 from "./images/1x/right/right06.webp";
import Pic07 from "./images/1x/right/right07.webp";

/* overlay */
/* loader (sin framer-motion) */
import LoadingScreen from "./LoadingScreen";


/* Lista estática → puede ir fuera del componente */
const sources = [
  Img01, Img02, Img03, Img04,
  Pic01, Pic02, Pic03, Pic04, Pic05, Pic06, Pic07,
];

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let loaded = 0;
    const minDuration = 1500;
    const start = Date.now();

    const finish = () => {
      loaded += 1;
      if (loaded === sources.length) {
        const elapsed = Date.now() - start;
        const extra = Math.max(0, minDuration - elapsed);
        setTimeout(() => setReady(true), extra);
      }
    };

    sources.forEach(src => {
      const img = new Image();
      img.onload = finish;
      img.onerror = finish;
      img.src = src;
    });
  }, []);
  

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
console.log("ready", ready);

  return (
  <>
    <LoadingScreen visible={!ready} />   

 
    <div style={{ position:"relative",
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
    </>
  );
}

export default App;
