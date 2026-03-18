import { useState, useRef, useEffect } from "react"
import { useAppStore } from "../store/appStore"
import confetti from "canvas-confetti"

export default function Question(){

  const setPage = useAppStore((state)=>state.setPage)

  const containerRef = useRef<HTMLDivElement | null>(null)

  const [position,setPosition] = useState({x:0,y:0})
  const [attempts,setAttempts] = useState(0)
  const [escaped,setEscaped] = useState(false)

  const [step,setStep] = useState(1) // 👈 start from 1 (auto first line)
  const [displayedText,setDisplayedText] = useState("")
  const [completedLines,setCompletedLines] = useState<string[]>([])
  const [isTyping,setIsTyping] = useState(false)

  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)

  const lines = [
    "So...",
    "I really like you a lot and wanna gup shup with you",
    "There’s something I’ve been meaning to ask you.",
    "Do you like me backk?"
  ]

  // TYPEWRITER
  useEffect(()=>{
    let i = 0
    const currentLine = lines[step - 1]

    setDisplayedText("")
    setIsTyping(true)

    const interval = setInterval(()=>{
      i++
      setDisplayedText(currentLine.slice(0,i))

      if(i >= currentLine.length){
        clearInterval(interval)
        setIsTyping(false)

        setCompletedLines(prev => {
          // prevent duplicate push
          if(prev.includes(currentLine)) return prev
          return [...prev, currentLine]
        })
      }
    }, 35)

    return ()=> clearInterval(interval)

  },[step])

  // TAP NEXT
  const nextStep = () => {
    if(isTyping) return
    if(step < lines.length){
      setStep(prev => prev + 1)
    }
  }

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
      particleCount:400,
      spread:180,
      origin:{y:0.6}
    })

    setTimeout(()=>{
      setPage(5)
    },3000)

  }

  return(

    <div 
      onClick={nextStep}
      className="h-screen w-screen bg-[#09095a] text-white flex flex-col items-center justify-center"
    >

      {/* TEXT */}
      <div className="flex flex-col items-center gap-5 text-center">

        {completedLines.map((line,index)=>(
          <div
            key={index}
            className={index === 0 
              ? "text-4xl font-serif"   // reduced from 5xl
              : "text-3xl text-glow"   // reduced from 4xl
            }
          >
            {line}
          </div>
        ))}

        {isTyping && (
          <div className={step === 1 ? "text-4xl font-serif" : "text-3xl text-glow"}>
            {displayedText}
            <span className="animate-pulse">|</span>
          </div>
        )}

        {/* 👇 TAP HINT */}
        {!isTyping && step < lines.length && (
          <div className="text-sm opacity-40 mt-4 animate-pulse">
            tap to continue
          </div>
        )}

      </div>

      {/* BUTTONS */}
      {step === lines.length && !isTyping && (
        <div
          ref={containerRef}
          className="relative w-[500px] h-[200px] flex items-center justify-center gap-8 mt-10"
        >

          <button
            onClick={handleYes}
            className="bg-green-500 px-6 py-3 rounded-lg text-white hover:bg-green-600 transition"
          >
            YES
          </button>

          {!isMobile && (
            <button
              onMouseEnter={moveButton}
              style={escaped ? {
                position:"absolute",
                left:position.x,
                top:position.y
              } : {}}
              className="bg-red-500 px-6 py-3 rounded-lg text-white"
            >
              {attempts >= 4 ? "Stop trying 😭" : "NO"}
            </button>
          )}

        </div>
      )}

      {isMobile && step === lines.length && !isTyping && (
        <div className="mt-6 text-gray-300 text-sm italic">
          No is not available on mobile 😌
        </div>
      )}

    </div>

  )

}