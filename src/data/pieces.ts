import raw from './pieces.json'
import timing from './timing.json'

export type PieceKind = 'doha' | 'chaupai'

export type Tile = {
  /** Single-verse id the painted still belongs to, e.g. 'chaupai-12'. */
  verse: string
  index: number
  idea: string
  src: string
}

export type Piece = {
  id: string
  order: number
  kind: PieceKind
  n?: number
  /** Last chaupai number when a piece sings two chaupais together. */
  nEnd?: number
  /** Single-verse ids this piece covers, in order (old saves and stills key off these). */
  from: string[]
  title: string
  lines: string[]
  meaning: string
  /** Four ideas per verse covered: 4 for a single verse, 8 for a pair. */
  pictureIdeas: string[]
  /** Painted stills in order: the first verse's four, then the second's. */
  tiles: Tile[]
  /** Seconds into the master recording, kept so cuts can be fine-tuned. */
  start: number
  end: number
}

type RawPiece = {
  id: string
  order: number
  kind: string
  n?: number
  nEnd?: number
  from?: string[]
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
  const from = piece.from ?? [piece.id]
  if (piece.pictureIdeas.length !== from.length * 4) {
    throw new Error(`Need four pictures per verse for ${piece.id}`)
  }
  if (piece.lines.length < 2) throw new Error(`Need verse lines for ${piece.id}`)
  const kind: PieceKind = piece.kind === 'doha' ? 'doha' : 'chaupai'
  const tiles = from.flatMap((verse, v) =>
    [0, 1, 2, 3].map((index) => ({
      verse,
      index,
      idea: piece.pictureIdeas[v * 4 + index],
      src: tileUrl(verse, index),
    })),
  )
  return {
    id: piece.id,
    order: piece.order,
    kind,
    n: piece.n,
    nEnd: piece.nEnd,
    from,
    title: piece.title,
    lines: piece.lines,
    meaning: piece.meaning,
    pictureIdeas: piece.pictureIdeas,
    tiles,
    start: span[0],
    end: span[1],
  }
})

export const pieceIds = pieces.map((piece) => piece.id)
export const pieceGroups = pieces.map((piece) => piece.from)

export function pieceLabel(piece: Piece): string {
  if (piece.id === 'doha-1') return 'Opening 1'
  if (piece.id === 'doha-2') return 'Opening 2'
  if (piece.id === 'doha-close') return 'Closing'
  if (piece.n && piece.nEnd) return `Verse ${piece.n}–${piece.nEnd}`
  return `Verse ${piece.n ?? piece.order}`
}

export function audioUrl(id: string): string {
  return `${import.meta.env.BASE_URL}audio/${id}.m4a`
}

/** Painted stills stay keyed by single verse (`public/art/tiles/<verse>-<0..3>.webp`). */
export function tileUrl(verse: string, index: number): string {
  return `${import.meta.env.BASE_URL}art/tiles/${verse}-${index}.webp`
}
