import { motion } from "framer-motion"
import { useEffect } from "react"
import { useAppStore } from "../store/appStore"
import { pianoMusic } from "../sounds/music"

export default function Welcome(){

    const nickname = useAppStore((state)=>state.nickname)
    const setPage = useAppStore((state)=>state.setPage)


    useEffect(() => {
        pianoMusic.play()
    }, [])

  return(

    <div
      className="h-screen w-screen bg-black flex items-center justify-center cursor-pointer"
      onClick={()=>setPage(2)}
    >

      <motion.div

        initial={{opacity:0, scale:0.9}}
        animate={{opacity:1, scale:1}}
        transition={{duration:2}}

        className="text-white text-4xl text-center font-serif"
      >

        Hello {nickname}

        <div className="text-lg mt-6 opacity-70">
          I built something for you
        </div>

        <div className="mt-10 text-sm opacity-40">
          click anywhere
        </div>

      </motion.div>

    </div>

  )

}