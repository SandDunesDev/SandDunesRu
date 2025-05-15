import React from "react";
import "./RandomizeAllButton.css";
import Cube from "../src/cube.svg";

export function RandomizeAllButton({ setIndexA, setIndexB }) {
    const getRandomIndex = () => Math.floor(Math.random() * 3);

    const handleClick = () => {
        setIndexA(getRandomIndex());
        setIndexB(getRandomIndex());
    };

    return (
        <button
            onClick={handleClick}
            style={{
                backgroundColor: "transparent",
                border: "none",
                position: "absolute",
                top: 40,
                left: "50%",
                transform: "translateX(-50%)",
            }}
        >
                <img
                    className="randomize-button"
                    src={Cube}
                    alt="icon"
                />
        </button>
    );
}
