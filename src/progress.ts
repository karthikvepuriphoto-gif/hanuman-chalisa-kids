export const STORAGE_KEY = 'little-chalisa-v1'
export const COACH_KEY = 'little-chalisa-coach'

export type Mode = 'learn' | 'practice'

export type Save = {
  v: 2
  heardThrough: number
  pieceId: string
  mode: Mode
}

/** Highest piece order the child may open. Piece 1 is always open. */
export function unlockedThrough(heardThrough: number, total = 24): number {
  return Math.min(total, Math.max(0, heardThrough) + 1)
}

/**
 * Hearing a piece in order records it and opens the next.
 * Replaying an earlier piece does not move the frontier backward or forward.
 */
export function bumpHeard(heardThrough: number, order: number, total = 24): number {
  if (order === heardThrough + 1 && order <= total) return order
  return heardThrough
}

/**
 * Version 1 saves counted 43 single-verse pieces. Version 2 pairs chaupais into
 * 4-line pieces. `groups[i]` lists the old ids inside new piece i, so an old
 * place maps to the piece that contains it, and an old frontier only counts a
 * paired piece as heard once both of its verses were heard.
 */
export function migrateV1(
  record: Record<string, unknown>,
  ids: readonly string[],
  groups: readonly (readonly string[])[],
): Record<string, unknown> {
  const legacy = groups.flat()
  const groupOf = (oldId: string) => groups.findIndex((group) => group.includes(oldId))
  let heard = 0
  if (typeof record.heardThrough === 'number' && record.heardThrough >= 1) {
    const h = Math.min(legacy.length, Math.floor(record.heardThrough))
    const oldId = legacy[h - 1]
    const index = groupOf(oldId)
    if (index >= 0) {
      const group = groups[index]
      heard = group[group.length - 1] === oldId ? index + 1 : index
    }
  }
  let pieceId: unknown = record.pieceId
  if (typeof pieceId === 'string' && !ids.includes(pieceId)) {
    const index = groupOf(pieceId)
    pieceId = index >= 0 ? ids[index] : undefined
  }
  return { ...record, v: 2, heardThrough: heard, pieceId }
}

export function sanitizeSave(
  raw: unknown,
  ids: readonly string[],
  groups?: readonly (readonly string[])[],
): Save {
  const first = ids[0] ?? 'doha-1'
  const fallback: Save = { v: 2, heardThrough: 0, pieceId: first, mode: 'learn' }
  if (!raw || typeof raw !== 'object') return fallback
  let record = raw as Record<string, unknown>
  if (record.v !== 2 && groups) record = migrateV1(record, ids, groups)
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
  return { v: 2, heardThrough: heard, pieceId, mode }
}

export function loadSave(ids: readonly string[], groups?: readonly (readonly string[])[]): Save {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return sanitizeSave(null, ids)
    return sanitizeSave(JSON.parse(raw), ids, groups)
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
