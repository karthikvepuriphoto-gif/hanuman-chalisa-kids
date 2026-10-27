import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import { storyboard } from './scenes.ts'

const ANIM = new Set(['float', 'glow', 'bounce', 'sparkle', 'sway', 'pop', 'rise', 'heartbeat'])

test('storyboard covers every piece with two tappable pictures', () => {
  const raw = JSON.parse(fs.readFileSync(new URL('../data/pieces.json', import.meta.url), 'utf8')) as {
    pieces: { id: string }[]
  }
  assert.equal(raw.pieces.length, 43)
  assert.equal(Object.keys(storyboard).length, 43)
  for (const piece of raw.pieces) {
    const pair = storyboard[piece.id]
    assert.ok(pair, piece.id)
    assert.equal(pair.length, 2, piece.id)
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
