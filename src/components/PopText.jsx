import './PopText.css'

export default function PopText({
  text = '',
  as: Tag = 'span',
  delay = 0,        // espera antes de la primera letra (segundos)
  stagger = 0.1,    // separación entre letras (segundos)
  className = '',
}) {
  return (
    <Tag className={`pop ${className}`} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="pop-letra"
          aria-hidden="true"
          style={{ animationDelay: `${delay + i * stagger}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  )
}