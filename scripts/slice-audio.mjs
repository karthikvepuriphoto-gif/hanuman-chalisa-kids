/**
 * Recut public/audio/*.m4a from the master recording.
 * Usage: node scripts/slice-audio.mjs /path/to/chalisa-full.m4a
 *
 * Bounds live in src/data/timing.json. They sit on quiet gaps in the
 * sung master (~8:36), one 4-line unit per piece plus a short breath.
 * Chaupais 25–26 are 305.80–327.25s.
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const master = process.argv[2]
if (!master) {
  console.error('Usage: node scripts/slice-audio.mjs /path/to/chalisa-full.m4a')
  process.exit(1)
}

const root = path.resolve(import.meta.dirname, '..')
const timing = JSON.parse(fs.readFileSync(path.join(root, 'src/data/timing.json'), 'utf8'))
const outDir = path.join(root, 'public/audio')
fs.mkdirSync(outDir, { recursive: true })

for (const [id, [start, end]] of Object.entries(timing)) {
  const duration = end - start
  const fadeOut = Math.max(0, duration - 0.04).toFixed(3)
  const dest = path.join(outDir, `${id}.m4a`)
  execFileSync('ffmpeg', [
    '-y',
    '-ss',
    String(start),
    '-to',
    String(end),
    '-i',
    master,
    '-af',
    `afade=t=in:st=0:d=0.02,afade=t=out:st=${fadeOut}:d=0.04`,
    '-c:a',
    'aac',
    '-b:a',
    '96k',
    '-ar',
    '44100',
    '-ac',
    '2',
    '-movflags',
    '+faststart',
    dest,
  ], { stdio: 'inherit' })
  console.log(`${id} ${duration.toFixed(2)}s`)
}
