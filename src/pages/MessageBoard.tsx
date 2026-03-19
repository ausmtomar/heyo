import { motion } from "framer-motion"
import { useAppStore } from "../store/appStore"
import ContinueButton from "../components/ContinueButton"
import TiltCard from "../components/TiltCard"
import { useEffect } from "react"

export default function MessageBoard(){

  const setPage = useAppStore((state)=>state.setPage)

  const messages = [
    {
      text: "Heyoooo, There is something I wanted to tell you for a while. I liked you the first time i saw you in Suvrat's story. IDK, i never said that for anyone but something clicked at the time, whether it was a joke or real i didn't know then.",
      img: "/images/1.webp"
    },
    {
      text: "Well then suvrat told you about it, we connected on insta thanks to you😂😂 and tbh I liked talking to you...",
      img: "/images/2.webp"
    },
    {
      text: "You said sometimes ki i should come and attend this or that party happening there, well i came and it was a really fun time of my life. It was literally a go with the flow phase for those days i were there. No planning nothing just being in the moment.",
      img: "/images/3.webp"
    },
    {
      text: "Spending those 3 days with you, it was something special. I liked spending time with you, cracking jokes, telling stories. And i felt i could tell you anything without giving a second thought. After coming back, I realised that i never directly told you that i like you",
      img: "/images/4.webp"
    },
    {
      text: "So that's why I built this little website, to tell you that i really like you a lot. No pressure on you just wanted to confess this.",
      img: "/images/5.webp"
    }
  ]

  useEffect(() => {
    messages.forEach((msg, index) => {
      setTimeout(() => {
        const img = new Image()
        img.src = msg.img
      }, index * 300) // 👈 stagger load
    })
  }, [])

  return(

    <div className="h-full w-full bg-[#181880] flex flex-col overflow-y-auto overflow-x-hidden">
      {messages.map((msg,index)=>{

        const isLeft = index % 2 === 0

        return(

          <motion.section
            key={index}

            className={`
            w-full max-w-6xl flex py-32 px-6 mx-auto
            ${isLeft ? "justify-start md:pl-24" : "justify-end md:pr-24"}
          `}

            initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-150px" }}
            transition={{ duration: 0.8 }}
          >

            <div
              className={`
                flex items-center w-full max-w-4xl
                ${isLeft 
                  ? "flex-row text-left gap-20 md:gap-28 lg:gap-32" 
                  : "flex-row-reverse text-right gap-20 md:gap-28 lg:gap-32"}
              `}
            >

              {/* IMAGE */}
              <TiltCard img={msg.img} />

              {/* TEXT */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="max-w-200 text-white text-xl leading-relaxed font-light"
              >
                {msg.text}
              </motion.div>

            </div>

          </motion.section>
        )
      })}

      {/* BUTTON */}
      <div className="pb-20 flex justify-center">
        <ContinueButton onClick={()=>setPage(4)} />
      </div>

    </div>
  )
}