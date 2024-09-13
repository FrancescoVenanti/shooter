import { canvas } from ".."
export default function listeners(){
  window.addEventListener('resize', (e) => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  window.addEventListener('DOMContentLoaded', (e) => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}
