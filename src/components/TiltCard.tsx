import { useRef } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion"

type Props = {
  img: string
}

const ROTATION_RANGE = 30
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2

export default function TiltCard({ img }: Props) {

  const ref = useRef<HTMLDivElement | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x, { stiffness: 120, damping: 15 })
  const ySpring = useSpring(y, { stiffness: 120, damping: 15 })

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`

  // ✅ FIX: useTransform instead of direct multiplication
  const glowX = useTransform(ySpring, (val) => val * 2)
  const glowY = useTransform(xSpring, (val) => val * -2)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()

    const width = rect.width
    const height = rect.height

    const mouseX = (e.clientX - rect.left) / width
    const mouseY = (e.clientY - rect.top) / height

    const rX = (mouseY - 0.5) * -ROTATION_RANGE
    const rY = (mouseX - 0.5) * ROTATION_RANGE

    x.set(rX)
    y.set(rY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="relative flex items-center justify-center">

      {/* 🌌 BACKGROUND GLOW */}
      <motion.div
        style={{
          x: glowX,
          y: glowY
        }}
        className="
          absolute w-[300px] h-[460px]
          rounded-2xl
          bg-indigo-500/30
          blur-3xl
          opacity-70
        "
      />

      {/* 💳 CARD */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform
        }}
        className="
          relative w-[260px] h-[420px]
          rounded-xl overflow-hidden
          shadow-2xl
          hover:scale-105 transition-transform
        "
      >
        <img
          src={img}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          style={{ transform: "translateZ(40px)" }}
        />
      </motion.div>

    </div>
  )
}