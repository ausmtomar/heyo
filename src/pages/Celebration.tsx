import { pianoMusic } from "../sounds/music"
import { useEffect } from "react"

export default function Celebration(){

  useEffect(()=>{
    pianoMusic.fade(0.5,0,2000)
  },[])

  return(
    <div className="h-screen w-screen bg-[#181880] text-white flex flex-col items-center justify-center text-center">

      {/* <div className="text-5xl mb-6">
        🎉
      </div> */}

      <div className="text-2xl md:text-3xl mb-10 max-w-2.5xl leading-relaxed">
        Ayyy, ladki hasee to phasee,
        hehehehehe<br></br>
        Now find some time out of your happening and busy schedule for me too...
      </div>

      <a
        href="https://meet.google.com/sgq-gqmi-jky"
        target="_blank"
        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg transition"
      >
        Come meet me
      </a>

    </div>
  )
}