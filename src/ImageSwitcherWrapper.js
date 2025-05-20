import React, { useState } from "react"
import { NextImageButton } from "./NextImageButton.js"

export default function ImageSwitcherWrapper({
  controlledIndex,
  setControlledIndex,
  images = [],
  buttonPosition = {},
}) {
  const [localIndex, setLocalIndex] = useState(0)

  const isControlled = controlledIndex !== undefined && setControlledIndex
  const imageIndex = isControlled ? controlledIndex : localIndex
  const setImageIndex = isControlled ? setControlledIndex : setLocalIndex

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            maxHeight: "100%",
            objectFit: "cover",
            display: "block",
            transition: "opacity 0.4s ease",
            opacity: index === imageIndex ? 1 : 0,
            pointerEvents: index === imageIndex ? "auto" : "none",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          zIndex: 10,
          ...buttonPosition,
        }}
      >
        <NextImageButton
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
          imagesLength={images.length}
        />

      </div>
    </div>
  )
}
