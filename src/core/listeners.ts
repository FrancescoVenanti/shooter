import { keyPressed } from "../lib/utils";
import { Canvas } from "./canvas";


export default function listeners(){
  window.addEventListener('resize', (e) => {
    Canvas.canvas.width = window.innerWidth
    Canvas.canvas.height = window.innerHeight
  })

  window.addEventListener('DOMContentLoaded', (e) => {
    Canvas.canvas.width = window.innerWidth
    Canvas.canvas.height = window.innerHeight
  })
  window.addEventListener('keydown', (e) => keyPressed.set(e.key.toLowerCase(), true))
  window.addEventListener('keyup', (e) => keyPressed.delete(e.key.toLowerCase()))
}
