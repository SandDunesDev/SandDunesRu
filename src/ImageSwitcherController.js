import React, { useState, useEffect, useMemo } from "react"
import ImageSwitcherWrapper from "./ImageSwitcherWrapper.js"
import { RandomizeAllButton } from "./RandomizeAllButton.js"
import { useMediaQuery } from "./UseMediaQuery.js"

import Img01 from "./images/01.png"
import Img02 from "./images/02.png"
import Img03 from "./images/03.png"

import Pic01 from "./images/picture01.png"
import Pic02 from "./images/picture02.png"
import Pic03 from "./images/picture03.png"

export default function ImageSwitcherController({ setSelectedImageA, setSelectedImageB }) {
  const [indexA, setIndexA] = useState(0)
  const [indexB, setIndexB] = useState(0)

  const isMobile = useMediaQuery("(max-width: 799px)")

  const imagesA = useMemo(() => [Img01, Img02, Img03], [])
  const imagesB = useMemo(() => [Pic01, Pic02, Pic03], [])

  useEffect(() => {
    setSelectedImageA(imagesA[indexA])
    setSelectedImageB(imagesB[indexB])
  }, [indexA, indexB, imagesA, imagesB, setSelectedImageA, setSelectedImageB])

  const buttonPositionA = isMobile
    ? { bottom: 52, left: 20 }
    : { bottom: 64, left: "50%", transform: "translateX(-50%)" }

  const buttonPositionB = isMobile
    ? { top: 16, left: 20 }
    : { bottom: 64, left: "50%", transform: "translateX(-50%)" }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
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
