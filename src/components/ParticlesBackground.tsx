import { useEffect, useState } from "react"
import Particles from "@tsparticles/react"
import { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { memo } from "react"

export default memo(function ParticlesBackground() {

  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  if (!init) return null

  return (
    <Particles
      id="tsparticles"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none"
      }}
      options={{
        // background: {
        //   color: "#ffffff"
        // },

        particles: {
          number: {
            value: 60
          },

          color: {
            value: "#00ff9f"
          },

          size: {
            value: 3
          },

          move: {
            enable: true,
            speed: 0.8
          },

          opacity: {
            value: 0.5
          }
        }
      }}
    />
  )
})