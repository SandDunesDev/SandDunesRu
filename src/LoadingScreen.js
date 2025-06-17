import React, { useEffect, useState } from "react";
import "./LoadingScreen.css";           

export default function LoadingScreen({ visible }) {
  const [render, setRender] = useState(visible);

  
  useEffect(() => {
    if (visible) {
      setRender(true);
      document.body.style.overflow = "hidden";
    } else {
      const t = setTimeout(() => {
        setRender(false);
        document.body.style.overflow = "";
      }, 600);
      return () => clearTimeout(t);
    }
  }, [visible]);

  if (!render) return null;

  return (
    <div className={`loading-overlay ${visible ? "is-visible" : "is-hidden"}`}>
      <img src="/logowhite.svg" alt="logo" className="loading-logo" />
    </div>
  );
}
