import raw from './pieces.json'
import timing from './timing.json'
import verseTiming from './verseTiming.json'
import devanagari from './devanagari.json'
import bookText from './bookText.json'
import { BOOK_PAGES, verseClip, type VerseClip } from '../bookPlan'

export type BookPage = {
  id: string
  index: number
  image: string
  title: string
  devanagari: string[]
  lines: string[]
  meaning: string
  audio: VerseClip | null
}

type RawPiece = { id: string; kind: string; n?: number; lines: string[]; from: string[] }
const rawPieces = raw.pieces as RawPiece[]
const groups = Object.fromEntries(rawPieces.map((p) => [p.id, p.from]))
const dev = devanagari as Record<string, string[]>
const meanings = bookText.verses as Record<string, string>

function verseLines(verse: string): string[] {
  const piece = rawPieces.find((p) => p.from.includes(verse))
  if (!piece) return []
  if (piece.from.length === 1) return piece.lines
  const half = piece.lines.length / 2
  return piece.from[0] === verse ? piece.lines.slice(0, half) : piece.lines.slice(half)
}

function verseTitle(verse: string): string {
  if (verse === 'doha-close') return 'Closing Doha'
  const [kind, n] = verse.split('-')
  return `${kind === 'doha' ? 'Doha' : 'Chaupai'} ${n}`
}

export const bookPages: BookPage[] = BOOK_PAGES.map((id, index) => ({
  id,
  index,
  image: `${import.meta.env.BASE_URL}book/${id}.webp`,
  title: id === 'cover' ? bookText.cover.title : verseTitle(id),
  devanagari: id === 'cover' ? [] : dev[id] ?? [],
  lines: id === 'cover' ? [] : verseLines(id),
  meaning: id === 'cover' ? bookText.cover.subtitle : meanings[id] ?? '',
  audio: id === 'cover' ? null : verseClip(id, timing as unknown as Record<string, [number, number]>, groups, verseTiming as unknown as Record<string, [number, number]>),
}))
