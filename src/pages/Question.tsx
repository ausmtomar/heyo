import { useState } from "react"
import { useAppStore } from "../store/appStore"
import confetti from "canvas-confetti"

export default function Question(){

  const setPage = useAppStore((state)=>state.setPage)

  const [position,setPosition] = useState({x:0,y:0})

  const moveButton = () => {

    const x = Math.random()*400 - 200
    const y = Math.random()*200 - 100

    setPosition({x,y})

  }

  const handleYes = () => {

    confetti({
      particleCount:300,
      spread:150,
      origin:{y:0.6}
    })

    setTimeout(()=>{
      setPage(5)
    },1500)

  }

  return(

    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center">
        <div className="text-5xl mb-12 text-center font-serif">
            So...
        </div>
      <div className="text-4xl mb-10 text-center text-glow">
        Will you go out with me?
      </div>

      <div className="flex gap-8 relative">

        <button
          onClick={handleYes}
          className="bg-green-500 px-6 py-3 rounded-lg text-white"
        >
          YES
        </button>

        <button
          onMouseEnter={moveButton}

          style={{
            transform:`translate(${position.x}px,${position.y}px)`
          }}

          className="bg-red-500 px-6 py-3 rounded-lg text-white transition"
        >
          NO
        </button>

      </div>

    </div>

  )

}