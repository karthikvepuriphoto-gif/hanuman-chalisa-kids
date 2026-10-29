import { useEffect, useState } from 'react'

type Props = {
  idea: string
  src: string
  side: 'left' | 'right'
}

/** A painted still. Tapping it gives a short lift; the sound keeps playing. */
export function PictureButton({ idea, src, side }: Props) {
  const [lit, setLit] = useState(0)
  useEffect(() => {
    if (!lit) return
    const timer = window.setTimeout(() => setLit(0), 1850)
    return () => window.clearTimeout(timer)
  }, [lit])
  return (
    <figure
      className={`pic-btn side-${side}${lit ? ' is-lit' : ''}`}
      role="button"
      tabIndex={0}
      aria-label={idea}
      onClick={() => setLit((n) => n + 1)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          setLit((n) => n + 1)
        }
      }}
    >
      <img src={src} alt="" />
      <figcaption className="caption">{idea}</figcaption>
    </figure>
  )
}
