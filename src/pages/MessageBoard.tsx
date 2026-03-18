import { motion } from "framer-motion"
import { useAppStore } from "../store/appStore"
import ContinueButton from "../components/ContinueButton"
import TiltCard from "../components/TiltCard"
import { useEffect } from "react"

export default function MessageBoard(){

  const setPage = useAppStore((state)=>state.setPage)

  const messages = [
    {
      text: "There is something I wanted to tell you for a while.",
      img: "/images/1.webp"
    },
    {
      text: "Every time we talk, my day becomes better.",
      img: "/images/2.webp"
    },
    {
      text: "You probably don't realize it...",
      img: "/images/3.webp"
    },
    {
      text: "But you are someone very special to me.",
      img: "/images/4.webp"
    },
    {
      text: "And that's why I built this little website.",
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

    <div className="h-full w-full bg-[#09095a] flex flex-col overflow-y-auto overflow-x-hidden">
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
                className="max-w-md text-white text-xl leading-relaxed font-light"
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