import Polaroid from '../components/Polaroid'
import { Papel, Etiqueta } from '../components/Papel'
import { MailIcon, GithubIcon, LinkedinIcon, PinIcon, DownloadIcon } from '../components/Icons'
import { profile } from '../data/profile'
import { skills } from '../data/skills'
import Estrella from '../components/Estrella'
import PopText from '../components/PopText'
import './SobreMi.css'

export default function SobreMi() {
  const c = profile.contact
  const filas = [
    ['Profesión', profile.role],
    ['Formación', profile.studies],
    ['Ubicación', profile.location],
    ['Intereses', profile.interests],
  ]

  return (
    <section className="sm">
      <div className="sm-hoja">
        <div className="sm-foto">
          <Polaroid />
        </div>

        <header className="sm-titulo">
            <div className="sm-titulo-inner">
             <Estrella className="sm-e1" color="#7fdede" borde="#706962" />
             <Estrella className="sm-e2" />
             <Estrella className="sm-e3" />
             <Estrella className="sm-e4" />

             <Papel bloque>
                <h1><PopText text="About Me" delay={0.2} loop /></h1>
            </Papel>
             <Etiqueta className="sm-nombre">{profile.name}</Etiqueta>
            </div>
          </header>

        <div className="sm-cajas">
          <article className="caja" style={{ '--i': 0 }}>
            <h2>Mi recorrido académico</h2>
            <p className="caja-intro">{profile.intro}</p>
            <dl className="caja-datos">
              {filas.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </article>

          <article className="caja" style={{ '--i': 1 }}>
            <h2>Habilidades</h2>
            <ul className="caja-skills">
              {skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </article>
        </div>

        <aside className="sm-contacto">
          <h2>Contacto</h2>
          <a href={`mailto:${c.email}`}><MailIcon /> {c.email}</a>
          <a href={c.github} target="_blank" rel="noreferrer"><GithubIcon /> {c.githubLabel}</a>
          <a href={c.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon /> {c.linkedinLabel}</a>
          <span><PinIcon /> {profile.location}</span>
          <a className="sm-cv" href="/cv-lucero.pdf" download="CV-Lucero-Lasala.pdf">
            <DownloadIcon /> Descargar CV
          </a>
        </aside>
      </div>
    </section>
  )
}