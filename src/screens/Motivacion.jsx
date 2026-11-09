import { useState } from 'react'
import { Papel, Etiqueta } from '../components/Papel'
import PopText from '../components/PopText'
import Estrella from '../components/Estrella'
import corazon from '../assets/decor/corazon.png'
import { profile } from '../data/profile'
import './Motivacion.css'

// Posición de cada estrella en % del contenedor que rodea al sobre
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

export default function Motivacion() {
  const [abierto, setAbierto] = useState(false)

  // Valores por defecto: no se rompe aunque falte profile.motivation
  const m = {
    title: 'Motivación',
    subtitle: 'Por qué programo',
    text: 'Me motiva transformar ideas en aplicaciones que la gente pueda usar de verdad.',
    ...(profile.motivation || {}),
  }

  return (
    <section className={`mot ${abierto ? 'mot--abierto' : ''}`}>
        {/* Formas redondeadas para la solapa y el frente del sobre */}
<svg
  width="0"
  height="0"
  style={{ position: 'absolute' }}
  aria-hidden="true"
  focusable="false"
>
  <defs>
    <clipPath id="clip-solapa" clipPathUnits="objectBoundingBox">
      <path d="M0.04,0 L0.96,0 Q1,0 0.98,0.04 L0.55,0.9 Q0.5,1 0.45,0.9 L0.02,0.04 Q0,0 0.04,0 Z" />
    </clipPath>
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
                '--d': `${0.9 + k * 0.1}s`,
              }}
            />
          ))}
        </div>

        <div className="sobre">
          <div className="sobre-fondo" />
          <div className="sobre-solapa" />

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

          <img className="sello" src={corazon} alt="" aria-hidden="true" />

          <button
            type="button"
            className="sobre-boton"
            onClick={() => setAbierto(!abierto)}
            aria-expanded={abierto}
            aria-label={abierto ? 'Cerrar el sobre' : 'Abrir el sobre'}
          />
        </div>

        <div className={`mot-pista ${abierto ? 'mot-pista--oculta' : ''}`}>
          <Etiqueta>Tocá el sobre ✉</Etiqueta>
        </div>
      </div>
    </section>
  )
}