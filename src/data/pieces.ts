import raw from './pieces.json'
import timing from './timing.json'

export type PieceKind = 'doha' | 'chaupai'

export type Piece = {
  id: string
  order: number
  kind: PieceKind
  n?: number
  title: string
  lines: string[]
  meaning: string
  pictureIdeas: [string, string, string, string]
  /** Seconds into the master recording, kept so cuts can be fine-tuned. */
  start: number
  end: number
}

type RawPiece = {
  id: string
  order: number
  kind: string
  n?: number
  title: string
  lines: string[]
  meaning: string
  pictureIdeas: string[]
}

const spans = timing as unknown as Record<string, [number, number]>

export const appName = raw.app.name
export const tagline = raw.app.tagline

export const pieces: Piece[] = (raw.pieces as RawPiece[]).map((piece) => {
  const span = spans[piece.id]
  if (!span) throw new Error(`Missing audio timing for ${piece.id}`)
  if (piece.pictureIdeas.length !== 4) throw new Error(`Need four pictures for ${piece.id}`)
  if (piece.lines.length < 2) throw new Error(`Need verse lines for ${piece.id}`)
  const kind: PieceKind = piece.kind === 'doha' ? 'doha' : 'chaupai'
  return {
    id: piece.id,
    order: piece.order,
    kind,
    n: piece.n,
    title: piece.title,
    lines: piece.lines,
    meaning: piece.meaning,
    pictureIdeas: [
      piece.pictureIdeas[0],
      piece.pictureIdeas[1],
      piece.pictureIdeas[2],
      piece.pictureIdeas[3],
    ],
    start: span[0],
    end: span[1],
  }
})

export const pieceIds = pieces.map((piece) => piece.id)

export function pieceLabel(piece: Piece): string {
  if (piece.id === 'doha-1') return 'Opening 1'
  if (piece.id === 'doha-2') return 'Opening 2'
  if (piece.id === 'doha-close') return 'Closing'
  return `Verse ${piece.n ?? piece.order}`
}

export function audioUrl(id: string): string {
  return `${import.meta.env.BASE_URL}audio/${id}.m4a`
}

export function tileUrl(id: string, index: number): string {
  return `${import.meta.env.BASE_URL}art/tiles/${id}-${index}.webp`
}
