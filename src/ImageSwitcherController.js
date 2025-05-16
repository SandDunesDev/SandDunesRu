import React, { useState, useEffect } from "react"
import ImageSwitcherWrapper from "./ImageSwitcherWrapper.js"
import { RandomizeAllButton } from "./RandomizeAllButton.js"
import { useMediaQuery } from "./UseMediaQuery.js"

export default function ImageSwitcherController({ setSelectedImageA, setSelectedImageB }) {
  const [indexA, setIndexA] = useState(0)
  const [indexB, setIndexB] = useState(0)

  const isMobile = useMediaQuery("(max-width: 799px)")

  const imagesA = [
    "images/image01.png",
    "images/image02.png",
    "images/image03.png",
  ]

  const imagesB = [
    "images/Body01.png",
    "images/Body02.png",
    "images/Body03.png",
  ]

  useEffect(() => {
    setSelectedImageA(imagesA[indexA])
    setSelectedImageB(imagesB[indexB])
  }, [indexA, indexB, imagesA, imagesB, setSelectedImageA, setSelectedImageB])

  // Позиция кнопок NextImageButton внутри каждого ImageSwitcherWrapper
  // для экранов > 800px — по центру внизу (bottom:16, left: 50% с transform)
  // для экранов ≤ 799px — задана текущая позиция (например, bottom-left и top-left)
  
  const buttonPositionA = isMobile
    ? { bottom: 16, left: 20 } // мобильная — слева снизу
    : { bottom: 28, left: "50%", transform: "translateX(-50%)" } // десктоп — по центру снизу

  const buttonPositionB = isMobile
    ? { top: 16, left: 20 } // мобильная — слева сверху
    : { bottom: 28, left: "50%", transform: "translateX(-50%)" } // десктоп — по центру снизу

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      <RandomizeAllButton
        setIndexA={setIndexA}
        setIndexB={setIndexB}
      />

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: "100%",
          height: "100%",
        }}
      >
        <ImageSwitcherWrapper
          controlledIndex={indexA}
          setControlledIndex={setIndexA}
          images={imagesA}
          buttonPosition={buttonPositionA}
        />
        <ImageSwitcherWrapper
          controlledIndex={indexB}
          setControlledIndex={setIndexB}
          images={imagesB}
          buttonPosition={buttonPositionB}
        />
      </div>
    </div>
  )
}
