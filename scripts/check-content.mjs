import { execFileSync, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const ffprobe = spawnSync('ffprobe', ['-version'], { stdio: 'ignore' })
const canProbe = !ffprobe.error && ffprobe.status === 0
if (!canProbe) {
  console.log('ffprobe not found; skipping audio duration checks')
}

const root = path.resolve(import.meta.dirname, '..')
const pieces = JSON.parse(fs.readFileSync(path.join(root, 'src/data/pieces.json'), 'utf8')).pieces
const timing = JSON.parse(fs.readFileSync(path.join(root, 'src/data/timing.json'), 'utf8'))
const scenes = fs.readFileSync(path.join(root, 'src/art/scenes.ts'), 'utf8')

if (pieces.length !== 43) fail(`expected 43 pieces, found ${pieces.length}`)

const ids = new Set()
for (const piece of pieces) {
  if (ids.has(piece.id)) fail(`duplicate id ${piece.id}`)
  ids.add(piece.id)
  if (!piece.lines?.length || !piece.meaning) fail(`missing text for ${piece.id}`)
  if (piece.pictureIdeas?.length !== 4) fail(`need four picture ideas for ${piece.id}`)
  const span = timing[piece.id]
  if (!span) fail(`missing timing for ${piece.id}`)
  const duration = span[1] - span[0]
  if (duration < 9.5 || duration > 26) fail(`${piece.id} duration ${duration.toFixed(2)}s is outside 9.5–26s`)
  if (!scenes.includes(`'${piece.id}'`)) fail(`storyboard missing ${piece.id}`)
  const audioPath = path.join(root, 'public/audio', `${piece.id}.m4a`)
  if (!fs.existsSync(audioPath)) fail(`missing audio file ${piece.id}`)
  if (!canProbe) continue
  const probed = Number(
    execFileSync('ffprobe', [
      '-v',
      'error',
      '-show_entries',
      'format=duration',
      '-of',
      'default=noprint_wrappers=1:nokey=1',
      audioPath,
    ])
      .toString()
      .trim(),
  )
  if (Math.abs(probed - duration) > 0.45) {
    fail(`${piece.id} file is ${probed.toFixed(2)}s but timing span is ${duration.toFixed(2)}s`)
  }
}

const orders = pieces.map((piece) => piece.order)
for (let n = 1; n <= 43; n += 1) {
  if (!orders.includes(n)) fail(`missing order ${n}`)
}
if (pieces.filter((piece) => piece.kind === 'doha').length !== 3) fail('expected 3 dohas')
if (pieces.filter((piece) => piece.kind === 'chaupai').length !== 40) fail('expected 40 chaupais')

const c25 = timing['chaupai-25']
const c26 = timing['chaupai-26']
if (c25[0] < 304 || c25[0] > 307) fail(`chaupai 25 should start near 5:05, got ${c25[0]}`)
if (c26[1] < 325 || c26[1] > 329) fail(`chaupai 26 should end near 5:27, got ${c26[1]}`)

console.log(`ok: 43 pieces, audio ${c25[0].toFixed(2)}s–${c26[1].toFixed(2)}s for chaupais 25–26`)

function fail(message) {
  console.error(message)
  process.exit(1)
}
