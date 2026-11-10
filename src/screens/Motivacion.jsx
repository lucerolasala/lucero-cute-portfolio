import { useState, useEffect } from 'react'
import { Papel, Etiqueta } from '../components/Papel'
import PopText from '../components/PopText'
import Estrella from '../components/Estrella'
import sello from '../assets/decor/sello.png'
import { profile } from '../data/profile'
import './Motivacion.css'

const frases = [
  '¡tengo una carta para vos! :D',
  '¿qué estas esperando? :(',
  'hay una sorpresa adentro :3',
  'prometo que no es spam e_e',
  '¿querés saber que me motiva? :O',
  'hecha con mucho amor <3',
]

// Dónde aparece cada globo (en % de la escena) y cuánto se inclina
const lugares = [
  { l: '68%', t: '-8%',  r: 4 },
  { l: '2%',  t: '-4%',  r: -5 },
  { l: '70%', t: '78%',  r: -3 },
  { l: '0%',  t: '74%',  r: 5 },
]

// Estrellas que quedan: posición final en % del contenedor que rodea al sobre
const estrellas = [
  { l: 15, t: 2,  w: 4.2, r: 12,  c: '#6b625c' },
  { l: 3,  t: 20, w: 5.8, r: -8,  c: '#ffffff' },
  { l: 91, t: 3,  w: 5.6, r: 10,  c: '#ffffff' },
  { l: 85, t: 28, w: 4.2, r: -14, c: '#6b625c' },
  { l: 5,  t: 60, w: 4.6, r: 8,   c: '#ffffff' },
  { l: 94, t: 66, w: 5.6, r: 12,  c: '#ffffff' },
  { l: 88, t: 90, w: 3.4, r: -6,  c: '#ffffff' },
  { l: 13, t: 74, w: 5.2, r: -10, c: '#ffffff' },
  { l: 18, t: 84, w: 9.5, r: -12, c: '#ffffff' },
  { l: 76, t: 10, w: 3.2, r: 18,  c: '#6b625c' },
]

// Chispas: estrellitas que salen disparadas en todas direcciones y se esfuman
const colores = ['#ffffff', '#f6c6d8', '#6b625c']
const chispas = Array.from({ length: 18 }, (_, k) => {
  const ang = (k / 18) * Math.PI * 2 + (k % 2) * 0.2
  const dist = 22 + (k % 3) * 9
  return {
    cx: +(Math.cos(ang) * dist).toFixed(2),
    cy: +(Math.sin(ang) * dist).toFixed(2),
    w: 1.6 + (k % 4) * 0.5,
    r: ((k * 47) % 90) - 45,
    c: colores[k % 3],
  }
})

export default function Motivacion() {
  const [abierto, setAbierto] = useState(false)
  const [f, setF] = useState(0)   // índice de la frase actual

  // Cambia de frase cada 3,2 s mientras el sobre está cerrado
  useEffect(() => {
    if (abierto) return
    const t = setInterval(() => setF((v) => v + 1), 3200)
    return () => clearInterval(t)
  }, [abierto])

  // Valores por defecto: no se rompe aunque falte profile.motivation
  const m = {
    title: 'Mi esencia',
    subtitle: 'Mi forma de ver el desarrollo',
    text: 'Me gusta transformar ideas en experiencias digitales útiles, cuidar cada detalle y encontrar soluciones creativas a través del código. Creo que cada proyecto es una oportunidad para aprender, experimentar y dejar mi propia huella.',
    ...(profile.motivation || {}),
  }

  const lugar = lugares[f % lugares.length]

  return (
    <section className={`mot ${abierto ? 'mot--abierto' : ''}`}>
      {/* Forma redondeada del frente del sobre */}
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute' }}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id="clip-frente" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L0.45,0.468 Q0.5,0.52 0.55,0.468 L1,0 L1,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="mot-escena">
        <div className="mot-estrellas" aria-hidden="true">
          {estrellas.map((e, k) => (
            <Estrella
              key={k}
              className="mot-estrella"
              color={e.c}
              borde={e.c === '#ffffff'}
              style={{
                left: `${e.l}%`,
                top: `${e.t}%`,
                width: `${e.w}%`,
                rotate: `${e.r}deg`,
                '--l': e.l,
                '--t': e.t,
                '--w': e.w,
                '--r': `${e.r}deg`,
                '--d': `${0.55 + k * 0.05}s`,
              }}
            />
          ))}

          {/* Explosión: destello, onda y chispas (solo al abrir) */}
          {abierto && (
            <>
              <span className="mot-destello" />
              <span className="mot-onda" />
              {chispas.map((c, k) => (
                <Estrella
                  key={`c${k}`}
                  className="mot-chispa"
                  color={c.c}
                  borde={c.c === '#ffffff'}
                  style={{
                    left: `calc(var(--ox) * 1% - ${c.w / 2}%)`,
                    top: `calc(var(--oy) * 1% - ${c.w / 2}cqw)`,
                    width: `${c.w}%`,
                    '--cx': c.cx,
                    '--cy': c.cy,
                    '--r': `${c.r}deg`,
                    '--s': `${(k % 6) * 0.03}s`,
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Globo de texto: solo con el sobre cerrado */}
        {!abierto && (
          <div
            key={f}
            className="mot-globo"
            style={{
              left: lugar.l,
              top: lugar.t,
              '--r': `${lugar.r}deg`,
            }}
            aria-hidden="true"
          >
            {frases[f % frases.length]}
          </div>
        )}

        <div className="sobre">
          <div className="sobre-fondo" />

          {/* Solapa de arriba: punta redondeada, siempre por encima de los pliegues */}
          <div className="sobre-solapa">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="grad-solapa" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#776d66" />
                  <stop offset="1" stopColor="#5d554e" />
                </linearGradient>
              </defs>
              <path
                d="M4,0 L96,0 Q100,0 98,4 L55,90 Q50,100 45,90 L2,4 Q0,0 4,0 Z"
                fill="url(#grad-solapa)"
              />
              <path
                d="M2,4 L45,90 Q50,100 55,90 L98,4"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.4"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="sobre-carta">
            <div className="mot-cabecera">
              <Papel bloque className="mot-papel">
                <h1 className={abierto ? '' : 'mot-oculto'}>
                  <PopText
                    key={abierto ? 'abierto' : 'cerrado'}
                    text={m.title}
                    delay={0.8}
                  />
                </h1>
              </Papel>
              <Etiqueta className="mot-subtitulo">{m.subtitle}</Etiqueta>
            </div>
            <p className="mot-texto">{m.text}</p>
          </div>

          <div className="sobre-frente" />

          {/* Pliegues rectos: de las esquinas de abajo hacia el centro */}
          <div className="sobre-detalles" aria-hidden="true">
            <svg viewBox="0 0 145 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad-pliegue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#6e645d" />
                  <stop offset="1" stopColor="#5f564f" />
                </linearGradient>
              </defs>

              {/* Panel de abajo */}
              <polygon points="0,100 72.5,50 145,100" fill="url(#grad-pliegue)" />

              {/* Sombra + luz en los bordes de los pliegues */}
              <path
                d="M0,100 L72.5,50 L145,100"
                fill="none"
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="1.4"
                vectorEffect="non-scaling-stroke"
                transform="translate(0 -0.8)"
              />
              <path
                d="M0,100 L72.5,50 L145,100"
                fill="none"
                stroke="rgba(255,255,255,0.24)"
                strokeWidth="1.2"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M0,0 L65.25,46.8 Q72.5,52 79.75,46.8 L145,0"
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.2"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <img className="sello" src={sello} alt="" aria-hidden="true" />

          <button
            type="button"
            className="sobre-boton"
            onClick={() => setAbierto(!abierto)}
            aria-expanded={abierto}
            aria-label={abierto ? 'Cerrar el sobre' : 'Abrir el sobre'}
          />
        </div>

      </div>
    </section>
  )
}