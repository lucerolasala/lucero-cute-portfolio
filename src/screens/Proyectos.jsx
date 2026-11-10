import { Papel, Etiqueta } from '../components/Papel'
import Carpeta from '../components/Carpeta'
import Estrella from '../components/Estrella'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import './Proyectos.css'

export default function Proyectos() {
  return (
    <section className="pr">
      <header className="pr-titulo">
        <div className="pr-titulo-inner">
          <Estrella className="pr-estrella pr-e1" color="#7fdede" borde />
          <Estrella className="pr-estrella pr-e2" />
          <Estrella className="pr-estrella pr-e3" />

          <Papel>
            <h1>Mis proyectos</h1>
          </Papel>
          <Etiqueta className="pr-tag">{profile.name}</Etiqueta>
        </div>
      </header>

      <div className="pr-grid">
        {projects.map((p, idx) => (
          <Carpeta key={p.id} proyecto={p} delay={900 + idx * 200} />
        ))}
      </div>
    </section>
  )
}