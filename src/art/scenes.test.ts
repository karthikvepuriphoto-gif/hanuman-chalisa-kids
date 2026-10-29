import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import { storyboard } from './scenes.ts'

const ANIM = new Set(['float', 'glow', 'bounce', 'sparkle', 'sway', 'pop', 'rise', 'heartbeat'])

test('storyboard covers every piece with four tappable pictures', () => {
  const raw = JSON.parse(fs.readFileSync(new URL('../data/pieces.json', import.meta.url), 'utf8')) as {
    pieces: { id: string; from?: string[] }[]
  }
  assert.equal(raw.pieces.length, 24)
  // Stills stay keyed by single verse; every verse a piece covers needs its four.
  assert.equal(Object.keys(storyboard).length, 43)
  const verses = raw.pieces.flatMap((piece) => piece.from ?? [piece.id])
  assert.equal(verses.length, 43)
  for (const verse of verses) {
    const piece = { id: verse }
    const pair = storyboard[piece.id]
    assert.ok(pair, piece.id)
    assert.equal(pair.length, 4, piece.id)
    for (const scene of pair) {
      assert.ok(ANIM.has(scene.anim), `${piece.id} ${scene.anim}`)
      assert.ok(scene.items.length > 0, piece.id)
      assert.ok(
        scene.items.some((item) => item.main),
        `${piece.id} needs a picture that moves when tapped`,
      )
    }
  }
})
