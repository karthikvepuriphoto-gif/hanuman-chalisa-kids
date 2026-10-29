import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import { BOOK_PAGES, clampPage, lineAt, verseClip } from './bookPlan.ts'

const read = (p: string) => JSON.parse(fs.readFileSync(new URL(p, import.meta.url), 'utf8'))
const timing = read('./data/timing.json')
const verseTiming = read('./data/verseTiming.json')
const pieces = read('./data/pieces.json').pieces as { id: string; from: string[] }[]
const groups = Object.fromEntries(pieces.map((p) => [p.id, p.from]))

test('book has a cover and 43 verse pages in order', () => {
  assert.equal(BOOK_PAGES.length, 44)
  assert.deepEqual(BOOK_PAGES.slice(0, 4), ['cover', 'doha-1', 'doha-2', 'chaupai-1'])
  assert.equal(BOOK_PAGES.at(-1), 'doha-close')
  assert.deepEqual(BOOK_PAGES.slice(1), pieces.flatMap((p) => p.from))
})

test('every verse plays only its own half of a paired clip', () => {
  const a = verseClip('chaupai-1', timing, groups, verseTiming)!
  const b = verseClip('chaupai-2', timing, groups, verseTiming)!
  assert.equal(a.clip, 'chaupai-1-2')
  assert.equal(b.clip, 'chaupai-1-2')
  assert.equal(a.start, 0)
  assert.equal(a.end, b.start)
  assert.ok(a.end > 8 && a.end < 12)
  assert.equal(b.end, +(timing['chaupai-1-2'][1] - timing['chaupai-1-2'][0]).toFixed(3))
  const single = verseClip('chaupai-37', timing, groups, verseTiming)!
  assert.deepEqual([single.clip, single.start], ['chaupai-37', 0])
  for (const verse of BOOK_PAGES.slice(1)) {
    const clip = verseClip(verse, timing, groups, verseTiming)!
    assert.ok(clip.end - clip.start > 4, `${verse} too short`)
  }
  assert.equal(verseClip('cover', timing, groups, verseTiming), null)
})

test('line glow and page clamping', () => {
  assert.equal(lineAt(['ab', 'ab'], 0.1), 0)
  assert.equal(lineAt(['ab', 'ab'], 0.9), 1)
  assert.equal(clampPage(99), 43)
  assert.equal(clampPage('x'), 0)
})
