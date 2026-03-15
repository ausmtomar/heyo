import { useState, useRef } from "react"
import { useAppStore } from "../store/appStore"
import Typewriter from "typewriter-effect"
import ParticlesBackground from "../components/ParticlesBackground"
import { motion } from "framer-motion"

export default function LockScreen(){

    const errorTimer = useRef<number | null>(null)
    const shakeTimer = useRef<number | null>(null)
    const [error, setError] = useState(false)
    const [hintIndex, setHintIndex] = useState(0)
    const [shake, setShake] = useState(false)
    const validNicknames = [
        "aayush",
        "ayush",
        "aayushman",
        "tomar"
        ]

    const hints = [
        "hint: you already know the answer",
        "hint: try your nickname",
        "hint: lowercase works better",
        "hint: how did i ragebait you",
        "hint: almost there..."
        ]

  const [input, setInput] = useState("")
  const setPage = useAppStore((state)=>state.setPage)
  const setNickname = useAppStore((state)=>state.setNickname)

  const handleSubmit = () => {

        const value = input.trim().toLowerCase()

        if(validNicknames.includes(value)){

            setNickname(input)
            setPage(1)

        } else {

            setError(true)
            setShake(true)

            setHintIndex((prev) => (prev + 1) % hints.length)

            // clear previous timers
            if (shakeTimer.current) clearTimeout(shakeTimer.current)
            if (errorTimer.current) clearTimeout(errorTimer.current)


            shakeTimer.current = setTimeout(()=>{
                setShake(false)
            },400)

            errorTimer.current = setTimeout(()=>{
                setError(false)
            },5000)

        }

    }

  return (

    <div className="h-screen w-screen bg-[#121218] text-[#f5f1e6] font-terminal flex flex-col items-center justify-center relative">

        <ParticlesBackground />

        <div className="z-10 flex flex-col items-center gap-6 backdrop-blur-md bg-white/5 border border-white/10 min-w-225 rounded-xl px-10 py-15">

        <div className=" text-green-400 text-4xl">

            <Typewriter
            options={{
                delay: 35,
                cursor: "_"
            }}

            onInit={(typewriter)=>{

                typewriter
                .typeString("> booting system...")
                .pauseFor(800)

                .deleteAll()

                .typeString("> decrypting memories...")
                .pauseFor(800)

                .deleteAll()

                .typeString("> loading secure message...")
                .pauseFor(800)

                .deleteAll()

                .typeString("> identity verification required")
                .start()

            }}
            />

        </div>

        <motion.div
            className="flex gap-3"
            animate={shake ? { x: [-10,10,-10,10,0] } : { x:0 }}
            transition={{ duration:0.4 }}>

            <input
            className="bg-[#121218] border text-1xl border-green-400 focus:border-[#00ff9f] text-green-400 px-4 py-2 font-terminal caret-green-400 w-90 outline-none "
            placeholder="enter nickname..."
            value={input}
            onChange={(e)=>setInput(e.target.value)}

            onKeyDown={(e)=>{
                if(e.key === "Enter"){
                handleSubmit()
                }
            }}
            />
            

            

            <button
                onClick={handleSubmit}
                className="relative overflow-hidden border border-green-400 px-6 py-2 text-green-400 group"
                >

                <span className="relative z-10 transition group-hover:text-black">
                enter
                </span>

                <span className="absolute left-1/2 top-1/2 w-0 h-0 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 group-hover:w-75 group-hover:h-75"></span>

            </button>
        </motion.div>
            <div className="flex gap-4">
                <div className="text-green-500 text-sm opacity-70 mt-2">
                {hints[hintIndex]}
                </div>
                {error && (
                <div className="text-red-400 text-sm mt-2">
                    ACCESS DENIED
                </div>
                )}
            </div>

        </div>

    </div>

    )

}