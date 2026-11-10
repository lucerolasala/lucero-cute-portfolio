import './Nav.css'

export default function Nav({ actual, etiquetas, onGo }) {
  return (
    <>
      {/* Puntitos laterales */}
      <nav className="nav-puntos" aria-label="Pantallas">
        {etiquetas.map((e, idx) => (
          <button
            key={e}
            type="button"
            className={`nav-punto ${idx === actual ? 'nav-punto--activo' : ''}`}
            onClick={() => onGo(idx)}
            aria-label={e}
            aria-current={idx === actual ? 'page' : undefined}
          >
            <span>{e}</span>
          </button>
        ))}
      </nav>

      {/* Pista: solo en la portada */}
      {actual === 0 && (
        <button type="button" className="nav-pista" onClick={() => onGo(1)}>
          Deslizá <b>↓</b>
        </button>
      )}
    </>
  )
}