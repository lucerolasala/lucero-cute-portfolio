import { useEffect, useState } from 'react'
import './Typewriter.css'

export default function Typewriter({
  text = '',
  speed = 90,        // ms por letra al escribir
  eraseSpeed = 45,   // ms por letra al borrar (solo con loop)
  delay = 500,       // espera antes de empezar
  pause = 2200,      // pausa con el texto completo (solo con loop)
  loop = true,          // si se borra y vuelve a escribir
  cursor = false,
}) {
  const [n, setN] = useState(0)
  const [fase, setFase] = useState('escribiendo')

  const reducido =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reducido || !text) return

    let t
    if (fase === 'escribiendo') {
      if (n < text.length) {
        t = setTimeout(() => setN((v) => v + 1), n === 0 ? delay : speed)
      } else if (loop) {
        t = setTimeout(() => setFase('borrando'), pause)
      }
    } else if (n > 0) {
      t = setTimeout(() => setN((v) => v - 1), eraseSpeed)
    } else {
      t = setTimeout(() => setFase('escribiendo'), 0)
    }
    return () => clearTimeout(t)
  }, [n, fase, text, speed, eraseSpeed, delay, pause, loop, reducido])

  const visible = reducido ? text : text.slice(0, n)

  return (
    <span className="tw" aria-label={text}>
      {/* Texto completo invisible: reserva el espacio para que nada se mueva */}
      <span className="tw-reserva" aria-hidden="true">{text}</span>
      <span className="tw-vivo" aria-hidden="true">
        {visible}
        {cursor && <span className="tw-cursor" />}
      </span>
    </span>
  )
}