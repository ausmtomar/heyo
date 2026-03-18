import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useAppStore } from "../store/appStore"

export default function Page2() {

  const setPage = useAppStore((state) => state.setPage)

  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [error, setError] = useState("")
  const [showOptions, setShowOptions] = useState(false)

  const correctIndex = 2 // 👈 CHANGE (0 = June, 1 = Jan, 2 = July)

  useEffect(() => {

    setTimeout(() => setStep(1), 1500)
    setTimeout(() => setStep(2), 3000)
    setTimeout(() => setShowOptions(true), 4000)
  }, [])

  const handleSelect = (index: number) => {
    setSelected(index)

    if (index === correctIndex) {
      setError("")
      setTimeout(() => {
        setPage(3)
      }, 1200)
    } else {
      setError("Hmm… not quite. Try again 🙂")
      setSelected(null)
    }
  }

  const options = [
    "4th June",
    "4th January",
    "4th July"
  ]

  return (
    <div className="h-screen w-screen bg-[#050538] text-white flex flex-col items-center justify-center text-center overflow-hidden px-4">

      {/* TITLE */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-romantic mb-6"
          >
            Before we go further…
          </motion.h1>
        )}
      </AnimatePresence>

      {/* SUBTEXT */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg md:text-xl font-ui mb-10 text-gray-300"
          >
            Let’s see if you remember something…
          </motion.p>
        )}
      </AnimatePresence>

      {/* QUESTION */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-150"
          >
            <p className="mb-8 text-xl font-romantic">
              Do you remember the date mentioned in the song on my profile?
            </p>

            <div className="flex flex-col gap-4">

              {options.map((opt, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelect(index)}
                  className={`px-6 py-4 rounded-xl border transition-all duration-300 ${
                    selected === index
                      ? "border-white bg-white/10"
                      : "border-gray-600 hover:border-white"
                  }`}
                >
                  {opt}
                </motion.button>
              ))}

            </div>

            {/* ERROR */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-red-400"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}