import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

type Props = {
  text?: string
  onClick?: () => void
}

export default function ContinueButton({ text = "Continue →", onClick }: Props) {

  const btnRef = useRef<HTMLButtonElement | null>(null)
  const spanRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {

    const handleMouseMove = (e: MouseEvent) => {

      const target = e.currentTarget as HTMLElement
      const { width } = target.getBoundingClientRect()

      const offset = (e as any).offsetX
      const left = `${(offset / width) * 100}%`

      spanRef.current?.animate(
        { left },
        { duration: 250, fill: "forwards" }
      )
    }

    const handleMouseLeave = () => {
      spanRef.current?.animate(
        { left: "50%" },
        { duration: 150, fill: "forwards" }
      )
    }

    const button = btnRef.current
    if (!button) return

    button.addEventListener("mousemove", handleMouseMove)
    button.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      button.removeEventListener("mousemove", handleMouseMove)
      button.removeEventListener("mouseleave", handleMouseLeave)
    }

  }, [])

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      ref={btnRef}
      onClick={onClick}
      className="
        relative w-full max-w-lg overflow-hidden rounded-xl
        bg-[#0f0f7a] border border-indigo-400/30
        px-20 py-5 text-lg font-medium text-white
        shadow-[0_0_30px_rgba(99,102,241,0.25)]
      "
    >

      {/* Text */}
      <span className="relative z-10">
        {text}
      </span>

      {/* Glow follower */}
      <span
        ref={spanRef}
        className="
          pointer-events-none absolute left-[50%] top-[50%]
          h-40 w-40 -translate-x-[50%] -translate-y-[50%]
          rounded-full bg-indigo-400/30 blur-2xl
        "
      />

    </motion.button>
  )
}