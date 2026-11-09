import './Papel.css'

// Papel crema con "postes" y puntitos a los costados
export function Papel({ bloque = false, className = '', children }) {
  return (
    <div className={`papel ${bloque ? 'papel--bloque' : ''} ${className}`}>
      {children}
    </div>
  )
}

// Etiqueta gris oscura con texto blanco
export function Etiqueta({ className = '', children }) {
  return <span className={`etiqueta ${className}`}>{children}</span>
}