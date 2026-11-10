import { useEffect, useState } from 'react'
import './PopText.css'

export default function PopText({
  text = '',
  as: Tag = 'span',
  delay = 0,        // espera antes de la primera letra (segundos)
  stagger = 0.1,    // separación entre letras (segundos)
  loop = false,     // repetir la animación
  pause = 2,        // segundos que el texto queda visible antes de repetir
  className = '',
}) {
  const [vuelta, setVuelta] = useState(0)
  const [saliendo, setSaliendo] = useState(false)

  useEffect(() => {
    if (!loop) return

    // Tiempo hasta que terminó de aparecer + la pausa
    const espera = vuelta === 0 ? delay : 0.15
    const visible = (espera + text.length * stagger + 0.6 + pause) * 1000

    const t1 = setTimeout(() => setSaliendo(true), visible)
    const t2 = setTimeout(() => {
      setSaliendo(false)
      setVuelta((v) => v + 1)
    }, visible + 500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [vuelta, loop, delay, stagger, pause, text])

  const espera = vuelta === 0 ? delay : 0.15

  return (
    <Tag className={`pop ${className}`} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          // la key cambia en cada vuelta: así la animación se reinicia
          key={`${vuelta}-${i}`}
          className={`pop-letra ${saliendo ? 'pop-letra--sale' : ''}`}
          aria-hidden="true"
          style={{
            animationDelay: saliendo ? `${i * 0.02}s` : `${espera + i * stagger}s`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  )
}