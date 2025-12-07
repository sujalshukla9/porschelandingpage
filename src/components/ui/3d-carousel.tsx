"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

import img0 from "../../assets/download.jpg"
import img1 from "../../assets/download (1).jpg"
import img2 from "../../assets/download (2).jpg"
import img3 from "../../assets/download (3).jpg"
import img4 from "../../assets/download (4).jpg"
import img5 from "../../assets/download (5).jpg"
import img6 from "../../assets/download (6).jpg"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}


const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] } as const
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] } as const

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
  }: {
    handleClick: (imgUrl: string, index: number) => void
    controls: any
    cards: string[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 1300 : 2600
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    const handlePrev = () => {
      const angle = 360 / faceCount
      const currentRotation = rotation.get()
      const targetRotation = currentRotation + angle
      controls.start({
        rotateY: targetRotation,
        transition: { duration: 0.5, ease: "easeOut" }
      })
      rotation.set(targetRotation)
    }

    const handleNext = () => {
      const angle = 360 / faceCount
      const currentRotation = rotation.get()
      const targetRotation = currentRotation - angle
      controls.start({
        rotateY: targetRotation,
        transition: { duration: 0.5, ease: "easeOut" }
      })
      rotation.set(targetRotation)
    }

    return (
      <div
        className="flex h-full items-center justify-center relative group"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 40,
                mass: 0.5,
              },
            })
          }
          animate={controls}
        >
          {cards.map((imgUrl, i) => (
            <motion.div
              key={`key-${imgUrl}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-[30px] p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)
                  }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(imgUrl, i)}
            >
              <motion.img
                src={imgUrl}
                alt={`keyword_${i} ${imgUrl}`}
                layoutId={`img-${imgUrl}`}
                className="pointer-events-none  w-full rounded-[30px] object-cover aspect-[3/4]"
                initial={{ filter: "blur(4px)" }}
                layout="position"
                animate={{ filter: "blur(0px)" }}
                transition={transition}
              />
              <motion.img
                src={imgUrl}
                alt={`reflection_${i} ${imgUrl}`}
                aria-hidden="true"
                className="pointer-events-none w-full rounded-[30px] object-cover aspect-[3/4] absolute top-full left-0 opacity-40"
                style={{
                  transform: "scaleY(-1) translateY(-2px)",
                  maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
                  WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
                }}
                transition={transition}
              />
            </motion.div>
          ))}
        </motion.div>
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none z-50 max-w-[90%] mx-auto">
          <button
            onClick={handlePrev}
            className="p-3 text-white/50 hover:text-white transition-colors hover:scale-110 pointer-events-auto"
            aria-label="Previous image"
          >
            <ArrowLeft className="w-10 h-10" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 text-white/50 hover:text-white transition-colors hover:scale-110 pointer-events-auto"
            aria-label="Next image"
          >
            <ArrowRight className="w-10 h-10" />
          </button>
        </div>
      </div>
    )
  }
)

function ThreeDPhotoCarousel() {
  const [activeImg, setActiveImg] = useState<string | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()
  const cards = useMemo(
    () => [img0, img1, img2, img3, img4, img5, img6],
    []
  )

  useEffect(() => {
    console.log("Cards loaded:", cards)
  }, [cards])

  const handleClick = (imgUrl: string) => {
    setActiveImg(imgUrl)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveImg(null)
    setIsCarouselActive(true)
  }

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeImg}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 m-4 md:m-12 lg:m-24 rounded-[30px]"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <motion.img
              layoutId={`img-${activeImg}`}
              src={activeImg}
              className="max-w-full max-h-full rounded-[30px] shadow-lg"
              initial={{ scale: 0.5 }} // Start with a smaller scale
              animate={{ scale: 1 }} // Animate to full scale
              transition={{
                delay: 0.5,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }} // Clean ease-out curve
              style={{
                willChange: "transform",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={cards}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  )
}

export { ThreeDPhotoCarousel };
