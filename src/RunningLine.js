import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function RunningLine() {
  const text = "crée une carte → assemble ou laisse le hasard faire ⚄ → reçois-la par e-mail  |  craft a postcard → match two columns or go random ⚄ → get your card emailed to you  |  как сделать открытку? → создай пару сам или доверься случайному выбору ⚄ → получи письмо с открыткой  |  ";
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
        border: "2px solid #222222",
        padding: "14px 20px",
        margin: "20px 20px 0 20px",
        backgroundColor: "white",
        boxSizing: "border-box",
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
              paddingRight: "8px",
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
