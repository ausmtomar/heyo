import { useState } from "react"
import { useAppStore } from "../store/appStore"

export default function Mystery(){

  const [input,setInput] = useState("")
  const setPage = useAppStore((state)=>state.setPage)

  const handleSubmit = () => {

    if(input.toLowerCase() === "yes"){
      setPage(3)
    }

  }

  return(

    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center text-center">

      <div className="text-3xl mb-8">
        Do you trust me?
      </div>

      <input
        className="bg-black border border-white px-4 py-2 text-center"
        placeholder="type YES"
        value={input}
        onChange={(e)=>setInput(e.target.value)}

        onKeyDown={(e)=>{
          if(e.key === "Enter"){
            handleSubmit()
          }
        }}
      />

    </div>

  )

}