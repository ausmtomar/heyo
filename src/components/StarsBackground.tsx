import { useMemo } from "react"

export default function StarsBackground() {

  const stars = useMemo(() => {

    const cols = 10
    const rows = 10

    const stars = []

    const cellWidth = 100 / cols
    const cellHeight = 100 / rows

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {

        stars.push({
          top: y * cellHeight + Math.random() * cellHeight,
          left: x * cellWidth + Math.random() * cellWidth,
          size: Math.random() * 15 + 4,
          delay: Math.random() * 5
        })

      }
    }

    return stars

  }, [])

  return (
    <div className="absolute inset-0">

      {stars.map((star, i) => (

        <div
          key={i}
          className="absolute star animate-star"

          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`
          }}
        />

      ))}

    </div>
  )
}