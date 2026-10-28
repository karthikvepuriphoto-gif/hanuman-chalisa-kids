type Props = {
  idea: string
  src: string
  side: 'left' | 'right'
}

export function PictureButton({ idea, src, side }: Props) {
  return (
    <figure className={`pic-btn area-${side}`}>
      <img src={src} alt={idea} />
      <figcaption className="caption">{idea}</figcaption>
    </figure>
  )
}
