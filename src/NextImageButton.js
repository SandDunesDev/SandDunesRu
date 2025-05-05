import React from "react";
import "./NextImageButton.css";

export function NextImageButton({ imageIndex = 0, setImageIndex }) {
    const handleClick = () => {
        const next = (imageIndex + 1) % 3;
        setImageIndex(next);
    };

    return (
        <button
            onClick={handleClick}
            style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
            }}
        >
            <img
                className="control-button"
                src="https://raw.githubusercontent.com/souvlakiGirl013/sanddunes/f8ff87197887705ab6ae2d0a7c6933f6d3cc714e/Type%3DSwitch.svg"
                alt="icon"
            />
        </button>
    );
}
