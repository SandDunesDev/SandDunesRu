import React from "react";
import { motion } from "framer-motion"

export default function RunningLine() {
    const text =
        "choisis l'image → choisis le texte → modifies si nécessaire → s*nd some DuNes → répétes choose the image → choose the text → change if needed → s*nd some DuNes → repeat выбери картинку → выбери текст → поменяй если нужно → отправь → повтори"

    return (
        <div
            style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "100vp",
                display: "flex",
                border: "2px solid #222222",
                padding: "14px 20px",
                margin: "20px 20px 0 20px",
                backgroundColor: "white",
            }}
        >
            <motion.div
                style={{
                    display: "inline-flex",
                }}
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    duration: 40,
                    ease: "linear",
                }}
            >
                <span
                    style={{
                        display: "inline-block",
                        color: "#000000",
                        fontFamily: "Roboto Mono, monospace",
                        fontSize: 12,
                        paddingRight: "100px",
                    }}
                >
                    {text}
                </span>
                <span
                    style={{
                        display: "inline-block",
                        color: "#000000",
                        fontFamily: "Roboto Mono, monospace",
                        fontSize: 12,
                    }}
                >
                    {text}
                </span>
            </motion.div>
        </div>
    )
}
