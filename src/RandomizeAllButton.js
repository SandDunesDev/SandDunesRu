import React from "react";
import "./NextImageButton.css";

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
            <div className="control-button-wrapper">
                <img
                    className="control-button"
                    src="https://raw.githubusercontent.com/souvlakiGirl013/sanddunes/f8ff87197887705ab6ae2d0a7c6933f6d3cc714e/Type%3DGame.svg"
                    alt="icon"
                />
            </div>
        </button>
    );
}
