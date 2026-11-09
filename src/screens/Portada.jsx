import Typewriter from '../components/Typewriter'
import { Papel, Etiqueta } from '../components/Papel'
import carpetaRosa from '../assets/decor/carpeta-rosa.png'
import { profile } from '../data/profile'
import corazon from '../assets/decor/corazon.png'
import './Portada.css'

function Estrella({ className = '' }) {
  return (
    <svg className={`p-estrella ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <polygon
        points="12,1.5 15,9 23,9.5 16.8,14.5 19,22.5 12,18 5,22.5 7.2,14.5 1,9.5 9,9"
        fill="#6b625c"
        stroke="#6b625c"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Portada() {
  const [tagArriba, tagAbajo, tagEtiqueta] = profile.tags

  return (
    <section className="portada">
      <div className="p-grupo">
        <img className="p-carpeta" src={carpetaRosa} alt="" aria-hidden="true" />

        <Papel bloque className="p-papel">
        <h1>
            <Typewriter text={profile.fullName} speed={90} delay={700} />
        </h1>
        </Papel>
  
        <span className="p-tag p-tag--arriba">{tagArriba}</span>
        <span className="p-tag p-tag--abajo">{tagAbajo}</span>

        <Etiqueta className="p-etiqueta">{tagEtiqueta}</Etiqueta>

        <img className="p-corazon" src={corazon} alt="" aria-hidden="true" />

        <Estrella className="p-e1" />
        <Estrella className="p-e2" />
        <Estrella className="p-e3" />
      </div>
    </section>
  )
}