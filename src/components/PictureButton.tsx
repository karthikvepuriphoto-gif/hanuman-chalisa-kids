import { useRef } from 'react'
import { StoryArt } from '../art/StoryArt'
import type { SceneSpec } from '../art/scenes'

type Props = {
  idea: string
  scene: SceneSpec
  side: 'left' | 'right'
  onTap?: () => void
}

export function PictureButton({ idea, scene, side, onTap }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const timer = useRef<number | null>(null)

  function tap() {
    const button = buttonRef.current
    const svg = button?.querySelector('svg')
    if (!button || !svg) return
    button.classList.remove('is-lit')
    svg.classList.remove('is-tapped')
    void button.offsetWidth
    button.classList.add('is-lit')
    svg.classList.add('is-tapped')
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      button.classList.remove('is-lit')
      svg.classList.remove('is-tapped')
    }, 1900)
    onTap?.()
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`pic-btn area-${side} motion-${scene.anim}`}
      aria-label={`${idea}. Tap for a short animation.`}
      onClick={tap}
    >
      <StoryArt scene={scene} />
      <p className="caption">{idea}</p>
    </button>
  )
}
