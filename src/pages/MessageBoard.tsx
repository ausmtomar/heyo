import { motion } from "framer-motion"
import { useAppStore } from "../store/appStore"

export default function MessageBoard(){

  const setPage = useAppStore((state)=>state.setPage)

  const messages = [

    "There is something I wanted to tell you for a while.",
    "Every time we talk, my day becomes better.",
    "You probably don't realize it...",
    "But you are someone very special to me.",
    "And that's why I built this little website."

  ]

  return(

    <div
      className="h-screen w-screen bg-black text-white font-romantic flex flex-col items-center justify-center cursor-pointer"
      onClick={()=>setPage(4)}
    >

      <div className="max-w-xl space-y-6">

        {messages.map((msg,index)=>(
          
          <motion.div

            key={index}

            initial={{opacity:0, y:30}}
            animate={{opacity:1, y:0}}

            transition={{
              delay: index*1.2,
              duration: 0.8
            }}

            className="bg-white text-black p-4 rounded-xl shadow-lg"
          >

            {msg}

          </motion.div>

        ))}

      </div>

      <div className="mt-10 text-sm opacity-50">
        click to continue
      </div>

    </div>

  )

}