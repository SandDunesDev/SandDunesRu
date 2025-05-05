import React, { useState, useEffect } from "react"
import ImageSwitcherWrapper from "./ImageSwitcherWrapper.js"
import { RandomizeAllButton } from "./RandomizeAllButton.js"
import { useMediaQuery } from "./UseMediaQuery.js"

export default function ImageSwitcherController({ setSelectedImageA, setSelectedImageB }) {
  const [indexA, setIndexA] = useState(0)
  const [indexB, setIndexB] = useState(0)

  const isMobile = useMediaQuery("(max-width: 800px)")

  const imagesA = [
    "https://raw.githubusercontent.com/souvlakiGirl013/sanddunes/refs/heads/main/Body01.png",
    "https://raw.githubusercontent.com/souvlakiGirl013/sanddunes/refs/heads/main/Body02.png",
    "https://raw.githubusercontent.com/souvlakiGirl013/sanddunes/refs/heads/main/Body03.png",
  ]

  const imagesB = [
    "https://raw.githubusercontent.com/souvlakiGirl013/sanddunes/refs/heads/main/image01.png",
    "https://raw.githubusercontent.com/souvlakiGirl013/sanddunes/refs/heads/main/image02.png",
    "https://raw.githubusercontent.com/souvlakiGirl013/sanddunes/refs/heads/main/image03.png",
  ]

  // ✅ Now it's safe to use indexA/indexB
  useEffect(() => {
    setSelectedImageA(imagesA[indexA])
    setSelectedImageB(imagesB[indexB])
  }, [indexA, indexB, imagesA, imagesB, setSelectedImageA, setSelectedImageB])

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
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <RandomizeAllButton
          setIndexA={setIndexA}
          setIndexB={setIndexB}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: "100%",
          height: "100%",
          gap: "2px",
        }}
      >
        <ImageSwitcherWrapper
          controlledIndex={indexA}
          setControlledIndex={setIndexA}
          images={imagesA}
        />
        <ImageSwitcherWrapper
          controlledIndex={indexB}
          setControlledIndex={setIndexB}
          images={imagesB}
        />
      </div>
    </div>
  )
}
