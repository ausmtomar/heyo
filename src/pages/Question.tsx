import { useState, useRef } from "react"
import { useAppStore } from "../store/appStore"
import confetti from "canvas-confetti"

export default function Question(){

  const setPage = useAppStore((state)=>state.setPage)

  const containerRef = useRef<HTMLDivElement | null>(null)

  const [position,setPosition] = useState({x:0,y:0})
  const [attempts,setAttempts] = useState(0)
  const [escaped,setEscaped] = useState(false)

  const cursorRef = useRef({x:0,y:0})

  const moveButton = (e:React.MouseEvent) => {

    setAttempts(prev => prev + 1)
    setEscaped(true)

    if(!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()

    const buttonWidth = 120
    const buttonHeight = 50

    const maxX = rect.width - buttonWidth
    const maxY = rect.height - buttonHeight

    const minDistance = 150

    let x = 0
    let y = 0

    const cursorX = e.clientX - rect.left
    const cursorY = e.clientY - rect.top

    do{
      x = Math.random() * maxX
      y = Math.random() * maxY
    }
    while(
      Math.sqrt((x - cursorX)**2 + (y - cursorY)**2) < minDistance
    )

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

      <div
        ref={containerRef}
        className="relative w-[500px] h-[200px] flex items-center justify-center gap-8"
      >

        <button
          onClick={handleYes}
          className="bg-green-500 px-6 py-3 rounded-lg text-white hover:bg-green-600 transition"
        >
          YES
        </button>

        <button
          onMouseEnter={moveButton}
          style={escaped ? {
            position:"absolute",
            left:position.x,
            top:position.y
          } : {}}
          className="bg-red-500 px-6 py-3 rounded-lg text-white"
        >
          {attempts >= 10 ? "Stop trying 😭" : "NO"}
        </button>

      </div>

    </div>

  )

}