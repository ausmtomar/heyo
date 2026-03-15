import { pianoMusic } from "../sounds/music"
import { useEffect } from "react"

export default function Celebration(){
    useEffect(()=>{
        pianoMusic.fade(0.5,0,2000)
        },[])
  return(
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center text-center">
        
      <div className="text-5xl mb-6">
        🎉
      </div>

      <div className="text-3xl mb-10">
        You just made me the happiest person alive
      </div>

      <a
        href="https://meet.google.com"
        target="_blank"
        className="bg-blue-500 px-6 py-3 rounded-lg"
      >
        Join me here
      </a>

    </div>

  )

}