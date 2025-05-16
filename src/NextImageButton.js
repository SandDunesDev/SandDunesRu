import React from "react";
import "./NextImageButton.css";

export function NextImageButton({ imageIndex = 0, setImageIndex, style = {} }) {
    const handleClick = () => {
        const next = (imageIndex + 1) % 3;
        setImageIndex(next);
    };

    return (
        <button
            onClick={handleClick}
            className="control-button"
            style={style}
        >
        </button>
    );
}
