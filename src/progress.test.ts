import assert from 'node:assert/strict'
import test from 'node:test'
import { bumpHeard, sanitizeSave, unlockedThrough } from './progress.ts'

const ids = ['doha-1', 'doha-2', 'chaupai-1']

test('the first verse is open before anything is heard', () => {
  assert.equal(unlockedThrough(0, 43), 1)
  assert.equal(unlockedThrough(42, 43), 43)
  assert.equal(unlockedThrough(43, 43), 43)
})

test('hearing the frontier verse opens the next one', () => {
  assert.equal(bumpHeard(0, 1), 1)
  assert.equal(bumpHeard(1, 2), 2)
  assert.equal(bumpHeard(42, 43), 43)
  assert.equal(bumpHeard(43, 43), 43)
})

test('replaying or skipping does not move the frontier', () => {
  assert.equal(bumpHeard(4, 2), 4)
  assert.equal(bumpHeard(4, 6), 4)
  assert.equal(bumpHeard(0, 3), 0)
})

test('a saved place past the frontier is pulled back', () => {
  const save = sanitizeSave(
    { v: 1, heardThrough: 0, pieceId: 'chaupai-1', mode: 'practice' },
    ids,
  )
  assert.equal(save.pieceId, 'doha-1')
  assert.equal(save.mode, 'practice')
  assert.equal(save.heardThrough, 0)
})

test('a valid save is kept', () => {
  const save = sanitizeSave(
    { v: 1, heardThrough: 1, pieceId: 'doha-2', mode: 'learn' },
    ids,
  )
  assert.equal(save.pieceId, 'doha-2')
  assert.equal(unlockedThrough(save.heardThrough, ids.length), 2)
})

test('junk storage falls back to the opening verse', () => {
  const save = sanitizeSave({ heardThrough: 99, pieceId: 'nope', mode: 'nope' }, ids)
  assert.deepEqual(save, { v: 1, heardThrough: 0, pieceId: 'doha-1', mode: 'learn' })
})
