import React from "react";
import { useState } from "react"
import { NextImageButton } from "./NextImageButton.js"
import { maxGeneratorDuration } from "framer-motion";

export default function ImageSwitcherWrapper({
    controlledIndex,
    setControlledIndex,
    images = [],
}) {
    const [localIndex, setLocalIndex] = useState(0)

    const isControlled = controlledIndex !== undefined && setControlledIndex
    const imageIndex = isControlled ? controlledIndex : localIndex
    const setImageIndex = isControlled ? setControlledIndex : setLocalIndex

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
                padding: "40px",
            }}
        >
            <NextImageButton
                style={{
                    position: "absolute", 
                    bottom: 40, 
                    zIndex: 10
                }}
                imageIndex={imageIndex}
                setImageIndex={setImageIndex}
            />
        </div>
    )
}
