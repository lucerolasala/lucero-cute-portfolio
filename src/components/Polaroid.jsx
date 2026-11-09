import clip from '../assets/decor/clip.png'
import foto from '../assets/foto.jpg'
import './Polaroid.css'

export default function Polaroid() {
  return (
    <div className="polaroid-zona">
      <figure className="polaroid">
        <div className="polaroid-foto">
          <img src={foto} alt="Foto de perfil de Lucero" />
        </div>
      </figure>
      <img className="clip" src={clip} alt="" aria-hidden="true" />
    </div>
  )
}