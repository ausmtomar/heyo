import { motion } from "framer-motion"
import { useEffect } from "react"
import { useAppStore } from "../store/appStore"
import { pianoMusic } from "../sounds/music"
import StarsBackground from "../components/StarsBackground"

export default function Welcome(){

    const nickname = useAppStore((state)=>state.nickname)
    const setPage = useAppStore((state)=>state.setPage)

    useEffect(() => {
        pianoMusic.play()

        document.body.style.overflow = "hidden"

        return () => {
          // re-enable scroll when leaving page
          document.body.style.overflow = "auto"
        }
    }, [])

  return(


    <div
      className="fixed inset-0 overflow-hidden bg-linear-to-b from-[#1d1d82a2] via-[#09095a] to-[#070747] flex items-center justify-center cursor-pointer"
      onClick={()=>{
        setPage(2)
      }}
    >

      <div className="absolute inset-0">
        <StarsBackground />
      </div>
      <div className="overflow-hidden">
        <motion.div
          initial={{opacity:0, scale:0.9}}
          animate={{opacity:1, scale:1}}
          transition={{duration:1.75}}
          className="relative text-[6rem] font-black text-center antialiased"
        >
          <span className="sweet-font text-8xl font-bold">Hiyo, A{nickname}</span><br></br>
          <div className="pt-4 beau-font text-[1.5rem] tracking-wider mt-6 opacity-90 backdrop-blur-2xl">
            Welcome to this site..(P.S. it’s specially made for you)<br></br>Something special awaits you...
          </div>
          <p className="text-sm"></p>
          <div className="mt-10 text-sm opacity-40">
            click anywhere
          </div>
        </motion.div>
      </div>

    </div>

  )

}