import React, { useEffect, useState } from "react";
import "./LoadingScreen.css";           // importa los estilos del loader

export default function LoadingScreen({ visible }) {
  const [render, setRender] = useState(visible);

  /* Mantiene el nodo montado mientras `visible` sea true y
     lo desmonta 600 ms después para que termine la transición */
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
