import { Papel, Etiqueta } from '../components/Papel'
import Carpeta from '../components/Carpeta'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import './Proyectos.css'

export default function Proyectos() {
  return (
    <section className="pr">
      <header className="pr-titulo">
        <Papel>
          <h1>Mis proyectos</h1>
        </Papel>
        <div>
          <Etiqueta className="pr-tag">{profile.name}</Etiqueta>
        </div>
      </header>

      <div className="pr-grid">
        {projects.map((p, idx) => (
          <Carpeta key={p.id} proyecto={p} delay={idx * 150} />
        ))}
      </div>
    </section>
  )
}