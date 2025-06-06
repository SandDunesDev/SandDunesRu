import React from "react";
import "./RandomizeAllButton.css";

export function RandomizeAllButton({ setIndexA, setIndexB }) {
    const getRandomIndex = () => Math.floor(Math.random() * 3);

    const handleClick = () => {
        setIndexA(getRandomIndex());
        setIndexB(getRandomIndex());
    };

    return (
        <button
            className="randomize-button"
            onClick={handleClick}
        >
        </button>
    );
}
