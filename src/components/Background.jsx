import Encaje from './Encaje'
import './Background.css'

export default function Background({ variante = 'turquesa', children }) {
  return (
    <div className={`fondo fondo--${variante}`}>
      <div className="fondo-rayas" aria-hidden="true" />
      <div className="fondo-banda" aria-hidden="true" />

      <div className="fondo-encaje" aria-hidden="true">
        <Encaje />
      </div>

      <div className="fondo-contenido">{children}</div>
    </div>
  )
}