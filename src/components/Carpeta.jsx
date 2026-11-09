import { useState } from 'react'
import './Carpeta.css'

export default function Carpeta({ proyecto: p, delay = 0 }) {
  const [abierta, setAbierta] = useState(false)

  return (
    <article
      className={`carpeta ${abierta ? 'carpeta--abierta' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="carpeta-tabs" aria-hidden="true">
        <span /><span /><span />
      </div>

      <div className="carpeta-cuerpo">
        <div
          className="carpeta-img"
          style={p.image ? { backgroundImage: `url(${p.image})` } : undefined}
        >
          {!p.image && <span>{p.name.charAt(0)}</span>}
        </div>

        <h3>{p.name}</h3>
        <p className="carpeta-short">{p.short}</p>

        <div className="carpeta-detalle">
          <p>{p.description}</p>
          <div className="carpeta-tags">
            {p.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="carpeta-links">
            {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">Repositorio</a>}
            {p.demo && <a href={p.demo} target="_blank" rel="noreferrer">Demo</a>}
          </div>
        </div>

        <button
          className="carpeta-btn"
          aria-expanded={abierta}
          onClick={() => setAbierta(!abierta)}
        >
          {abierta ? 'Ver menos' : 'Ver más'}
        </button>
      </div>
    </article>
  )
}