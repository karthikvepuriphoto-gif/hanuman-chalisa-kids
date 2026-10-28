import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const base = process.env.APP_URL ?? 'http://127.0.0.1:4173/hanuman-chalisa-kids/'
const out = '/tmp/chalisa-ui'
fs.mkdirSync(out, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'],
})

const page = await browser.newPage()
const errors = []
page.on('pageerror', (err) => errors.push(String(err)))
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text())
})

async function shot(name) {
  await page.screenshot({ path: `${out}/${name}.png` })
}

await page.setViewport({ width: 1180, height: 820, deviceScaleFactor: 1 })
await page.goto(base, { waitUntil: 'networkidle0' })
await page.waitForSelector('.verse-lines')
const title = await page.$eval('header p', (el) => el.textContent)
if (!title?.includes('Hanuman Chalisa')) throw new Error(`title missing: ${title}`)
const beads = await page.$$eval('.bead', (nodes) => nodes.length)
if (beads !== 43) throw new Error(`expected 43 beads, got ${beads}`)
const lines = await page.$$eval('.verse-lines p', (nodes) => nodes.map((n) => n.textContent))
if (!lines[0]?.includes('Shri Guru')) throw new Error(`opening line missing: ${lines.join(' | ')}`)
await shot('ipad-learn')
const fitted = await page.evaluate(() => {
  const footer = document.querySelector('footer')?.getBoundingClientRect()
  const play = document.querySelector('.play-btn')?.getBoundingClientRect()
  const pics = [...document.querySelectorAll('.pic-btn')].map((el) => el.getBoundingClientRect())
  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    footerBottom: footer?.bottom ?? 0,
    playTop: play?.top ?? 0,
    playBottom: play?.bottom ?? 0,
    pics: pics.map((box) => ({ w: box.width, h: box.height, x: box.x })),
    text: document.body.innerText,
  }
})
if (fitted.scrollWidth > fitted.innerWidth + 2) throw new Error(`horizontal overflow ${fitted.scrollWidth}`)
if (fitted.footerBottom > fitted.innerHeight + 2) throw new Error(`footer below the fold ${fitted.footerBottom}`)
if (fitted.playBottom > fitted.innerHeight) throw new Error('play button below the fold')
if (fitted.pics.length !== 4 || fitted.pics.some((pic) => pic.w < 120 || pic.h < 120)) {
  throw new Error(`pictures too small ${JSON.stringify(fitted.pics)}`)
}
const leftXs = fitted.pics.filter((pic) => pic.x < fitted.innerWidth / 2)
const rightXs = fitted.pics.filter((pic) => pic.x > fitted.innerWidth / 2)
if (leftXs.length !== 2 || rightXs.length !== 2) {
  throw new Error(`expected two tiles each side ${JSON.stringify(fitted.pics)}`)
}
if (fitted.text.includes('Practice from the very start')) {
  throw new Error('start-over control showed up during Learn')
}

await page.click('.play-btn')
await page.waitForFunction(() => {
  const audio = document.querySelector('audio')
  return audio && audio.currentTime > 0.2 && !audio.paused
})
const loop = await page.$eval('audio', (audio) => audio.loop)
if (!loop) throw new Error('learn mode should loop')
await shot('ipad-playing')

await page.waitForFunction(() => {
  const audio = document.querySelector('audio')
  return audio && audio.seekable.length > 0 && audio.seekable.end(0) > 5
})
await page.evaluate(() => {
  const audio = document.querySelector('audio')
  audio.currentTime = audio.seekable.end(0) - 0.3
})
await page.waitForFunction(() => {
  const second = document.querySelectorAll('.bead')[1]
  return second && !second.classList.contains('locked')
})
const hintOrOpen = await page.$eval('.bead.current', (el) => el.id)
if (hintOrOpen !== 'bead-doha-1') throw new Error(`left the first verse early: ${hintOrOpen}`)

await page.click('[aria-label="Next verse"]')
await page.waitForFunction(() => document.querySelector('.verse-lines')?.textContent?.includes('Budhi Heen'))
const secondSrc = await page.$eval('audio', (audio) => audio.dataset.id)
if (secondSrc !== 'doha-2') throw new Error(`expected doha-2, got ${secondSrc}`)
await shot('ipad-verse-2')

await page.click('[aria-label="How to listen"] button:nth-child(2)')
await page.waitForFunction(() => document.querySelector('[aria-selected="true"]')?.textContent?.includes('Practice'))
const practiceLoop = await page.$eval('audio', (audio) => audio.loop)
if (practiceLoop) throw new Error('practice should not loop')
const stillLearnCopy = await page.evaluate(() => document.body.innerText.includes('Practice from the very start'))
if (!stillLearnCopy) throw new Error('practice-from-start control missing')
const paused = await page.$eval('audio', (audio) => audio.paused)
if (paused) await page.click('.play-btn')
await page.waitForFunction(() => {
  const audio = document.querySelector('audio')
  return audio && Number.isFinite(audio.duration) && audio.duration > 1 && !audio.paused
})
await page.waitForFunction(() => {
  const audio = document.querySelector('audio')
  return audio && !audio.paused && audio.seekable.length > 0 && audio.seekable.end(0) > 5
})
await page.evaluate(() => {
  const audio = document.querySelector('audio')
  const end = audio.seekable.end(audio.seekable.length - 1)
  audio.currentTime = Math.max(0, end - 0.3)
})
await page.waitForFunction(() => document.querySelector('audio')?.dataset.id === 'chaupai-1', { timeout: 8000 })
await page.waitForFunction(() => document.querySelector('.verse-lines')?.textContent?.includes('Jai Hanuman'))
await shot('ipad-practice-advance')

await page.evaluate(() => {
  localStorage.setItem(
    'little-chalisa-v1',
    JSON.stringify({ v: 1, heardThrough: 42, pieceId: 'doha-close', mode: 'learn' }),
  )
})
await page.reload({ waitUntil: 'networkidle0' })
await page.waitForFunction(() => document.querySelector('.verse-lines')?.textContent?.includes('Pavantnai'))
await shot('ipad-closing')

for (const [id, file] of [
  ['chaupai-9', 'ipad-chaupai-9'],
  ['chaupai-11', 'ipad-chaupai-11'],
  ['chaupai-18', 'ipad-chaupai-18'],
  ['chaupai-25', 'ipad-chaupai-25'],
]) {
  await page.evaluate((pieceId) => {
    localStorage.setItem(
      'little-chalisa-v1',
      JSON.stringify({ v: 1, heardThrough: 43, pieceId, mode: 'learn' }),
    )
  }, id)
  await page.reload({ waitUntil: 'networkidle0' })
  await page.waitForFunction(
    (pieceId) => document.querySelector('audio')?.dataset.id === pieceId,
    {},
    id,
  )
  await shot(file)
}

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 })
await page.evaluate(() => localStorage.clear())
await page.reload({ waitUntil: 'networkidle0' })
await page.waitForSelector('.verse-lines')
const phone = await page.evaluate(() => {
  const pics = [...document.querySelectorAll('.pic-btn')].map((el) => el.getBoundingClientRect())
  const play = document.querySelector('.play-btn')?.getBoundingClientRect()
  return { pics, playTop: play?.top ?? 0, scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth }
})
if (phone.scrollWidth > phone.innerWidth + 2) throw new Error(`phone horizontal overflow ${phone.scrollWidth}`)
if (phone.pics.length !== 4) {
  throw new Error(`phone should show four tiles ${JSON.stringify(phone.pics)}`)
}
const phoneRows = new Set(phone.pics.map((pic) => Math.round(pic.y / 8)))
if (phoneRows.size < 2) throw new Error(`phone tiles should stack in two rows ${JSON.stringify(phone.pics)}`)
await shot('iphone-stacked')

await page.setViewport({ width: 844, height: 390, deviceScaleFactor: 2 })
await shot('iphone-landscape')

if (errors.length) {
  console.error(errors.join('\n'))
  throw new Error('page errors')
}

console.log('smoke ok')
await browser.close()
