import React from "react";
import "./NextImageButton.css";

export function NextImageButton({ imageIndex = 0, setImageIndex, imagesLength, style = {} }) {
    const handleClick = () => {
        const next = (imageIndex + 1) % imagesLength;
        setImageIndex(next);
    };

    return (
        <button
            onClick={handleClick}
            className="control-button"
            style={style}
        />
    );
}
