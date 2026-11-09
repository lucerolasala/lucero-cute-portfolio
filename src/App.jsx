import { useState, useEffect, useRef } from 'react'
import Background from './components/Background'
import Portada from './screens/Portada'
import SobreMi from './screens/SobreMi'
import Motivacion from './screens/Motivacion'
import Proyectos from './screens/Proyectos'
import './App.css'

const TOTAL = 4        // Portada, Sobre mí, Motivación, Proyectos
const DURACION = 800   // ms de la transición (igual que en App.css)
const TAM_LUNAR = 90   // separación aproximada entre lunares, en px

const variantes = ['turquesa', 'lunares', 'rayas', 'turquesa']

function Pantalla({ idx, offset = 0 }) {
  return (
    <Background variante={variantes[idx]}>
      <main
        className={`pantalla ${idx === 0 ? 'pantalla--portada' : ''}`}
        style={offset ? { translate: `0 ${-offset}px` } : undefined}
      >
        {idx === 0 && <Portada />}
        {idx === 1 && <SobreMi />}
        {idx === 2 && <Motivacion />}
        {idx === 3 && <Proyectos />}
      </main>
    </Background>
  )
}

export default function App() {
  const [i, setI] = useState(0)
  const [saliente, setSaliente] = useState(null) // { idx, dir, offset }
  const actual = useRef(0)
  const bloqueado = useRef(false)

  // Tamaño de lunar que hace entrar filas completas en el alto de la ventana
  useEffect(() => {
    const ajustar = () => {
      const alto = window.innerHeight
      const filas = Math.max(5, Math.round(alto / TAM_LUNAR))
      document.documentElement.style.setProperty(
        '--lunar-s',
        `${(alto / filas).toFixed(3)}px`
      )
    }
    ajustar()
    window.addEventListener('resize', ajustar)
    return () => window.removeEventListener('resize', ajustar)
  }, [])

  // Navegación: rueda, flechas y deslizar en el celular
  useEffect(() => {
    const cambiar = (dir) => {
      if (bloqueado.current) return
      const siguiente = Math.max(0, Math.min(TOTAL - 1, actual.current + dir))
      if (siguiente === actual.current) return

      bloqueado.current = true
      setSaliente({ idx: actual.current, dir, offset: window.scrollY })
      actual.current = siguiente
      setI(siguiente)

      setTimeout(() => {
        setSaliente(null)
        window.scrollTo(0, 0)
        bloqueado.current = false
      }, DURACION + 60)
    }

    // ¿La pantalla ya no tiene más para scrollear en esa dirección?
    const enBorde = (dir) => {
      const alto = document.documentElement.scrollHeight
      const alFinal = window.innerHeight + window.scrollY >= alto - 2
      const alInicio = window.scrollY <= 0
      return dir > 0 ? alFinal : alInicio
    }

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 20) return
      const dir = e.deltaY > 0 ? 1 : -1
      if (enBorde(dir)) cambiar(dir)
    }

    let inicioY = 0
    const onTouchStart = (e) => { inicioY = e.touches[0].clientY }
    const onTouchEnd = (e) => {
      const dif = inicioY - e.changedTouches[0].clientY
      if (Math.abs(dif) < 60) return
      const dir = dif > 0 ? 1 : -1
      if (enBorde(dir)) cambiar(dir)
    }

    const onKey = (e) => {
      if (e.key === 'ArrowRight') cambiar(1)
      if (e.key === 'ArrowLeft') cambiar(-1)
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const dir = e.key === 'ArrowDown' ? 1 : -1
        if (enBorde(dir)) {
          e.preventDefault()
          cambiar(dir)
        }
      }
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  // dir 1 = bajar (la actual sale hacia arriba), dir -1 = subir
  const modo = saliente ? (saliente.dir > 0 ? 'baja' : 'sube') : ''

  return (
    <div className={`viewport ${saliente ? 'viewport--moviendo' : ''}`}>
      {saliente && (
        <div key={`p${saliente.idx}`} className={`slide slide--${modo}-sale`}>
          <Pantalla idx={saliente.idx} offset={saliente.offset} />
        </div>
      )}

      <div key={`p${i}`} className={`slide ${saliente ? `slide--${modo}-entra` : ''}`}>
        <Pantalla idx={i} />
      </div>
    </div>
  )
}