import { Howl } from "howler"

export const pianoMusic = new Howl({
  src: ["/piano.mp3"],
  volume: 0.5,
  loop: false
})