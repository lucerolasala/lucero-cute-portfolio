// Encaje trenzado dibujado con ondas senoidales entrelazadas.
// Es periódico: W px de ancho se repite sin cortes.
const W = 150   // ancho del módulo (más grande = trenzado más abierto)
const H = 45  // alto de la banda
const C = H / 2

function onda(amp, fase) {
  const pts = []
  for (let x = -2; x <= W + 2; x++) {
    const y = C + amp * Math.sin((2 * Math.PI * x) / W + fase)
    pts.push(`${x === -2 ? 'M' : 'L'}${x},${y.toFixed(2)}`)
  }
  return pts.join(' ')
}

const ondas = [
  onda(14, 0),
  onda(14, Math.PI),
  onda(10, Math.PI / 2),
  onda(10, -Math.PI / 2),
]

export default function Encaje() {
  return (
    <svg
      className="encaje-svg"
      width="100%"
      height={H}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="encaje-trenzado" width={W} height={H} patternUnits="userSpaceOnUse">
          {/* velo blanco translúcido de fondo */}
          <rect width={W} height={H} fill="#ffffff" opacity="0.28" />

          {/* sombra suave para dar relieve */}
          {ondas.map((d, i) => (
            <path key={`s${i}`} d={d} fill="none" stroke="rgba(40,110,110,0.18)" strokeWidth="3.6" />
          ))}

          {/* hilos blancos */}
          {ondas.map((d, i) => (
            <path key={`h${i}`} d={d} fill="none" stroke="#ffffff" strokeWidth="2.2" opacity="0.92" />
          ))}

          {/* bordes punteados arriba y abajo */}
          <line x1="0" y1="1.5" x2={W} y2="1.5" stroke="#fff" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="0" y1={H - 1.5} x2={W} y2={H - 1.5} stroke="#fff" strokeWidth="2" strokeDasharray="3 3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#encaje-trenzado)" />
    </svg>
  )
}