/** Pure Picture Book helpers (no Vite imports, so node --test can load them). */

export const BOOK_PAGES = ['cover', 'doha-1', 'doha-2', ...Array.from({ length: 40 }, (_, i) => `chaupai-${i + 1}`), 'doha-close']

export type VerseClip = {
  /** Piece clip in public/audio/ that holds this verse. */
  clip: string
  /** Seconds inside that clip. */
  start: number
  end: number
}

type Span = [number, number]

/**
 * Where a single verse sits inside the 24 piece clips. A paired clip is cut at
 * the second verse's start (from the per-verse timing) so each half keeps its
 * own breath: the first half ends where the second begins.
 */
export function verseClip(
  verse: string,
  pieceTiming: Record<string, Span>,
  groups: Record<string, string[]>,
  verseTiming: Record<string, Span>,
): VerseClip | null {
  for (const [clip, from] of Object.entries(groups)) {
    const at = from.indexOf(verse)
    if (at < 0) continue
    const [clipStart, clipEnd] = pieceTiming[clip]
    const length = +(clipEnd - clipStart).toFixed(3)
    if (from.length === 1) return { clip, start: 0, end: length }
    const split = +(verseTiming[from[1]][0] - clipStart).toFixed(3)
    if (!(split > 0 && split < length)) throw new Error(`bad split for ${clip}`)
    return at === 0 ? { clip, start: 0, end: split } : { clip, start: split, end: length }
  }
  return null
}

/** Which line should glow, estimated from each line's length (no word timing exists). */
export function lineAt(lines: string[], fraction: number): number {
  const weights = lines.map((line) => Math.max(1, line.replace(/\s+/g, '').length))
  const total = weights.reduce((a, b) => a + b, 0)
  let acc = 0
  for (let i = 0; i < weights.length; i += 1) {
    acc += weights[i] / total
    if (fraction < acc) return i
  }
  return lines.length - 1
}

export function clampPage(page: unknown): number {
  const n = typeof page === 'number' && Number.isInteger(page) ? page : 0
  return Math.min(Math.max(n, 0), BOOK_PAGES.length - 1)
}
