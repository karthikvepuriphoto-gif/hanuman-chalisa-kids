export const STORAGE_KEY = 'little-chalisa-v1'
export const COACH_KEY = 'little-chalisa-coach'

export type Mode = 'learn' | 'practice'

export type Save = {
  v: 1
  heardThrough: number
  pieceId: string
  mode: Mode
}

/** Highest piece order the child may open. Piece 1 is always open. */
export function unlockedThrough(heardThrough: number, total = 43): number {
  return Math.min(total, Math.max(0, heardThrough) + 1)
}

/**
 * Hearing a piece in order records it and opens the next.
 * Replaying an earlier piece does not move the frontier backward or forward.
 */
export function bumpHeard(heardThrough: number, order: number, total = 43): number {
  if (order === heardThrough + 1 && order <= total) return order
  return heardThrough
}

export function sanitizeSave(raw: unknown, ids: readonly string[]): Save {
  const first = ids[0] ?? 'doha-1'
  const fallback: Save = { v: 1, heardThrough: 0, pieceId: first, mode: 'learn' }
  if (!raw || typeof raw !== 'object') return fallback
  const record = raw as Record<string, unknown>
  const total = ids.length
  const heard =
    typeof record.heardThrough === 'number' &&
    record.heardThrough >= 0 &&
    record.heardThrough <= total
      ? Math.floor(record.heardThrough)
      : 0
  const mode: Mode = record.mode === 'practice' ? 'practice' : 'learn'
  const requested = typeof record.pieceId === 'string' ? record.pieceId : first
  const order = ids.indexOf(requested) + 1
  const open = unlockedThrough(heard, total)
  const pieceId = order >= 1 && order <= open ? requested : ids[open - 1] ?? first
  return { v: 1, heardThrough: heard, pieceId, mode }
}

export function loadSave(ids: readonly string[]): Save {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return sanitizeSave(null, ids)
    return sanitizeSave(JSON.parse(raw), ids)
  } catch {
    return sanitizeSave(null, ids)
  }
}

export function writeSave(save: Save): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(save))
  } catch {
    /* Private mode or a full disk: the session still works. */
  }
}
