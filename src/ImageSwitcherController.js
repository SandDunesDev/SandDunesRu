import React, { useState, useEffect, useMemo } from "react"
import ImageSwitcherWrapper from "./ImageSwitcherWrapper.js"
import { RandomizeAllButton } from "./RandomizeAllButton.js"
import { useMediaQuery } from "./UseMediaQuery.js"

import Img01 from "./images/01.png"
import Img02 from "./images/02.png"
import Img03 from "./images/03.png"
import Img04 from "./images/04.png"

import Pic01 from "./images/picture01.webp"
import Pic02 from "./images/picture02.webp"
import Pic03 from "./images/picture03.webp"
import Pic04 from "./images/picture04.webp"
import Pic05 from "./images/picture05.webp"
import Pic06 from "./images/picture06.webp"
import Pic07 from "./images/picture07.webp"

export default function ImageSwitcherController({ setSelectedImageA, setSelectedImageB }) {
  const [indexA, setIndexA] = useState(0)
  const [indexB, setIndexB] = useState(0)

  const isMobile = useMediaQuery("(max-width: 799px)")

  const imagesA = useMemo(() => [Img01, Img02, Img03, Img04], [])
  const imagesB = useMemo(() => [Pic01, Pic02, Pic03, Pic04, Pic05, Pic06, Pic07], [])

  useEffect(() => {
    setSelectedImageA(imagesA[indexA])
    setSelectedImageB(imagesB[indexB])
  }, [indexA, indexB, imagesA, imagesB, setSelectedImageA, setSelectedImageB])

  const buttonPositionA = isMobile
    ? { bottom: 72, right: 64 }
    : { bottom: 64, left: "50%", transform: "translateX(-50%)" }

  const buttonPositionB = isMobile
    ? { top: 38, right: 64 }
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
