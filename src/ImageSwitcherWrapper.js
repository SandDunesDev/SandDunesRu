import React, { useState } from "react";
import { NextImageButton } from "./NextImageButton.js";

export default function ImageSwitcherWrapper({
    controlledIndex,
    setControlledIndex,
    images = [],
    buttonPosition = {},  // добавляем пропс для позиции кнопки
}) {
    const [localIndex, setLocalIndex] = useState(0);

    const isControlled = controlledIndex !== undefined && setControlledIndex;
    const imageIndex = isControlled ? controlledIndex : localIndex;
    const setImageIndex = isControlled ? setControlledIndex : setLocalIndex;

    return (
        <div
            style={{
                flex: 1,
                height: "100vp",
                backgroundImage: `url(${images[imageIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                padding: "28px",
            }}
        >
            <NextImageButton
                imageIndex={imageIndex}
                setImageIndex={setImageIndex}
                style={buttonPosition}  // прокидываем стиль позиционирования
            />
        </div>
    );
}
