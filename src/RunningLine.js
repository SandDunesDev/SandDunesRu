import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function RunningLine() {
  const text = "choisis l'image → choisis le texte → modifies si nécessaire → s*nd some DuNes → répétes choose the image → choose the text → change if needed → s*nd some DuNes → repeat выбери картинку → выбери текст → поменяй если нужно → отправь → повтори";
  const textRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      const width = textRef.current.offsetWidth;
      setTextWidth(width);
    }
  }, []);

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100vp",
        border: "2px solid #222222",
        padding: "14px 20px",
        margin: "20px 20px 0 20px",
        backgroundColor: "white",
      }}
    >
      {/* Невидимый текст для измерения */}
      <div
        ref={textRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "nowrap",
          fontFamily: "Roboto Mono, monospace",
          fontSize: 12,
          paddingRight: "100px",
        }}
      >
        {text}
      </div>

      {/* Анимация запускается только после измерения */}
      {textWidth > 0 && (
        <motion.div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
          }}
          animate={{ x: [`0px`, `-${textWidth}px`] }}
          transition={{
            repeat: Infinity,
            duration: textWidth / 20,
            ease: "linear",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "Roboto Mono, monospace",
              fontSize: 12,
              color: "#000000",
              paddingRight: "100px",
            }}
          >
            {text}
          </span>
          <span
            style={{
              display: "inline-block",
              fontFamily: "Roboto Mono, monospace",
              fontSize: 12,
              color: "#000000",
            }}
          >
            {text}
          </span>
        </motion.div>
      )}
    </div>
  );
}
