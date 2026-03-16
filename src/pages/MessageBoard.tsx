import { motion } from "framer-motion"
import { useAppStore } from "../store/appStore"
import ContinueButton from "../components/ContinueButton"
import TiltCard from "../components/TiltCard"

export default function MessageBoard(){

  const setPage = useAppStore((state)=>state.setPage)

  const messages = [
    {
      text: "There is something I wanted to tell you for a while.",
      img: "/images/1.jpg"
    },
    {
      text: "Every time we talk, my day becomes better.",
      img: "/images/2.jpg"
    },
    {
      text: "You probably don't realize it...",
      img: "/images/3.jpg"
    },
    {
      text: "But you are someone very special to me.",
      img: "/images/4.jpg"
    },
    {
      text: "And that's why I built this little website.",
      img: "/images/5.jpg"
    }
  ]

  return(

    <div className="min-h-screen w-screen bg-[#09095a] flex flex-col items-center overflow-y-auto">

      {messages.map((msg,index)=>(

        <motion.section
          key={index}
          className={`w-full max-w-6xl flex flex-col items-center justify-center gap-16 py-32 px-6 
          ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}

          initial={{opacity:0,y:60}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          transition={{duration:0.8}}

        >

          {/* IMAGE CARD */}

          <TiltCard img={msg.img} />


          {/* TEXT (SEPARATE CONTAINER) */}

          <div className="max-w-md text-white text-xl leading-relaxed font-light">

            {msg.text}

          </div>

        </motion.section>

      ))}

      <div className="pb-20">
        <ContinueButton onClick={()=>setPage(4)} />
      </div>

    </div>

  )
}