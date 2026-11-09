export default function Estrella({ color = '#6b625c', borde = false, className = '', style }) {
  return (
    <svg
      className={`estrella ${className}`}
      style={style}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <polygon
        points="12,1.5 15,9 23,9.5 16.8,14.5 19,22.5 12,18 5,22.5 7.2,14.5 1,9.5 9,9"
        fill={color}
        stroke={borde ? '#ffffff' : color}
        strokeWidth={borde ? 1.6 : 1.4}
        strokeLinejoin="round"
        paintOrder="stroke"
      />
    </svg>
  )
}