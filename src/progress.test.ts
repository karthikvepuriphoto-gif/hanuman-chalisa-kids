import assert from 'node:assert/strict'
import test from 'node:test'
import { bumpHeard, migrateV1, sanitizeSave, unlockedThrough } from './progress.ts'

const ids = ['doha-1', 'doha-2', 'chaupai-1-2', 'chaupai-3-4']
const groups = [['doha-1'], ['doha-2'], ['chaupai-1', 'chaupai-2'], ['chaupai-3', 'chaupai-4']]

test('the first verse is open before anything is heard', () => {
  assert.equal(unlockedThrough(0, 24), 1)
  assert.equal(unlockedThrough(23, 24), 24)
  assert.equal(unlockedThrough(24, 24), 24)
})

test('hearing the frontier verse opens the next one', () => {
  assert.equal(bumpHeard(0, 1), 1)
  assert.equal(bumpHeard(1, 2), 2)
  assert.equal(bumpHeard(23, 24), 24)
  assert.equal(bumpHeard(24, 24), 24)
})

test('replaying or skipping does not move the frontier', () => {
  assert.equal(bumpHeard(4, 2), 4)
  assert.equal(bumpHeard(4, 6), 4)
  assert.equal(bumpHeard(0, 3), 0)
})

test('a saved place past the frontier is pulled back', () => {
  const save = sanitizeSave(
    { v: 2, heardThrough: 0, pieceId: 'chaupai-1-2', mode: 'practice' },
    ids,
  )
  assert.equal(save.pieceId, 'doha-1')
  assert.equal(save.mode, 'practice')
  assert.equal(save.heardThrough, 0)
})

test('a valid save is kept', () => {
  const save = sanitizeSave(
    { v: 2, heardThrough: 1, pieceId: 'doha-2', mode: 'learn' },
    ids,
  )
  assert.equal(save.pieceId, 'doha-2')
  assert.equal(unlockedThrough(save.heardThrough, ids.length), 2)
})

test('junk storage falls back to the opening verse', () => {
  const save = sanitizeSave({ heardThrough: 99, pieceId: 'nope', mode: 'nope' }, ids)
  assert.deepEqual(save, { v: 2, heardThrough: 0, pieceId: 'doha-1', mode: 'learn' })
})

test('an old 43-piece save maps into paired pieces', () => {
  // Heard through old chaupai-2 (order 4): the 1–2 pair is complete.
  const done = sanitizeSave({ v: 1, heardThrough: 4, pieceId: 'chaupai-3', mode: 'learn' }, ids, groups)
  assert.equal(done.heardThrough, 3)
  assert.equal(done.pieceId, 'chaupai-3-4')
  // Heard only old chaupai-1 (order 3): the pair is not complete yet.
  const half = sanitizeSave({ v: 1, heardThrough: 3, pieceId: 'chaupai-2', mode: 'practice' }, ids, groups)
  assert.equal(half.heardThrough, 2)
  assert.equal(half.pieceId, 'chaupai-1-2')
  assert.equal(half.mode, 'practice')
})

test('migration ignores unknown old ids', () => {
  const out = migrateV1({ v: 1, heardThrough: 0, pieceId: 'nope' }, ids, groups)
  assert.equal(out.pieceId, undefined)
  assert.equal(out.heardThrough, 0)
})
