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

const TOTAL = 24
if (pieces.length !== TOTAL) fail(`expected ${TOTAL} pieces, found ${pieces.length}`)

const ids = new Set()
for (const piece of pieces) {
  if (ids.has(piece.id)) fail(`duplicate id ${piece.id}`)
  ids.add(piece.id)
  if (!piece.lines?.length || !piece.meaning) fail(`missing text for ${piece.id}`)
  const verses = piece.from ?? [piece.id]
  if (piece.pictureIdeas?.length !== verses.length * 4) fail(`need four picture ideas per verse for ${piece.id}`)
  for (const verse of verses) {
    for (let i = 0; i < 4; i += 1) {
      if (!fs.existsSync(path.join(root, 'public/art/tiles', `${verse}-${i}.webp`))) fail(`missing still ${verse}-${i}`)
    }
  }
  const span = timing[piece.id]
  if (!span) fail(`missing timing for ${piece.id}`)
  const duration = span[1] - span[0]
  if (duration < 9.5 || duration > 26) fail(`${piece.id} duration ${duration.toFixed(2)}s is outside 9.5–26s`)
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
for (let n = 1; n <= TOTAL; n += 1) {
  if (!orders.includes(n)) fail(`missing order ${n}`)
}
const tiles = fs.readdirSync(path.join(root, 'public/art/tiles')).filter((name) => name.endsWith('.webp'))
if (tiles.length !== 172) fail(`expected 172 story tiles, found ${tiles.length}`)

if (pieces.filter((piece) => piece.kind === 'doha').length !== 3) fail('expected 3 dohas')
if (pieces.filter((piece) => piece.kind === 'chaupai').length !== 21) fail('expected 21 chaupai pieces')
const covered = pieces.flatMap((piece) => piece.from ?? [piece.id]).filter((id) => id.startsWith('chaupai-'))
for (let n = 1; n <= 40; n += 1) {
  if (!covered.includes(`chaupai-${n}`)) fail(`chaupai ${n} is not in any piece`)
}
const ordered = pieces.slice().sort((a, b) => a.order - b.order)
for (let i = 1; i < ordered.length; i += 1) {
  const prev = timing[ordered[i - 1].id]
  const next = timing[ordered[i].id]
  if (next[0] < prev[1]) fail(`${ordered[i - 1].id} overlaps ${ordered[i].id}`)
}

const c25 = timing['chaupai-25-26']
const c26 = c25
if (!c25) fail('missing chaupai-25-26')
if (c25[0] < 304 || c25[0] > 307) fail(`chaupai 25 should start near 5:05, got ${c25[0]}`)
if (c26[1] < 325 || c26[1] > 329) fail(`chaupai 26 should end near 5:27, got ${c26[1]}`)

console.log(`ok: ${TOTAL} pieces, audio ${c25[0].toFixed(2)}s–${c26[1].toFixed(2)}s for chaupais 25–26`)

// Picture Book: 44 pages, each with web art, text, and (except the cover) a verse inside a clip.
{
  const read = (f) => JSON.parse(fs.readFileSync(new URL(`../src/data/${f}`, import.meta.url), 'utf8'))
  const verses = ['doha-1', 'doha-2', ...Array.from({ length: 40 }, (_, i) => `chaupai-${i + 1}`), 'doha-close']
  const bookText = read('bookText.json')
  const dev = read('devanagari.json')
  const vt = read('verseTiming.json')
  const bookDir = new URL('../public/book/', import.meta.url)
  const webps = fs.readdirSync(bookDir).filter((f) => f.endsWith('.webp'))
  if (webps.length !== 44) fail(`expected 44 book images, found ${webps.length}`)
  if (fs.readdirSync(bookDir).some((f) => !f.endsWith('.webp'))) fail('public/book should hold only .webp web images')
  for (const page of ['cover', ...verses]) {
    const file = new URL(`${page}.webp`, bookDir)
    if (!fs.existsSync(file)) fail(`missing book art ${page}.webp`)
    if (fs.statSync(file).size > 400 * 1024) fail(`${page}.webp is too large for the web`)
  }
  for (const v of verses) {
    const m = bookText.verses[v]
    if (!m || m.split(/[.!?]["”]?(\s|$)/).filter((x) => x && x.trim()).length > 3) fail(`book meaning for ${v} missing or too long`)
    if (!dev[v] || dev[v].length !== 2) fail(`Devanagari for ${v} should be two lines`)
    if (!vt[v]) fail(`verse timing missing for ${v}`)
  }
  for (const piece of pieces.filter((p) => p.from.length === 2)) {
    const [s, e] = timing[piece.id]
    const split = vt[piece.from[1]][0]
    if (!(split > s + 4 && split < e - 4)) fail(`book split for ${piece.id} at ${split} is outside the clip`)
  }
  console.log('ok: picture book has 44 pages with art, text and verse audio')
}

function fail(message) {
  console.error(message)
  process.exit(1)
}
