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
        { duration: 100, fill: "forwards" }
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

      whileTap={{ scale: 0.985 }}

      ref={btnRef}

      onClick={onClick}

      className="relative w-full max-w-lg overflow-hidden rounded-lg bg-white px-20 py-5 text-lg font-medium text-white shadow-xl"

    >

      <span className="pointer-events-none relative z-10 mix-blend-difference">

        {text}

      </span>

      <span

        ref={spanRef}

        className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-black"

      />

    </motion.button>

  )

}