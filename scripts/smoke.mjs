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
if (beads !== 24) throw new Error(`expected 24 beads, got ${beads}`)
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

await page.click('.pic-btn')
await page.waitForSelector('.pic-btn.is-lit')
await shot('ipad-tap')
const playingDuringTap = await page.$eval('audio[data-active]', (audio) => !audio.paused)
if (playingDuringTap) throw new Error('tap started audio by itself')

await page.click('.play-btn')
await page.waitForFunction(() => {
  const audio = document.querySelector('audio[data-active]')
  return audio && audio.currentTime > 0.2 && !audio.paused
})
const loop = await page.$eval('audio[data-active]', (audio) => audio.loop)
if (!loop) throw new Error('learn mode should loop')
await shot('ipad-playing')

await page.waitForFunction(() => {
  const audio = document.querySelector('audio[data-active]')
  return audio && audio.seekable.length > 0 && audio.seekable.end(0) > 5
})
await page.evaluate(() => {
  const audio = document.querySelector('audio[data-active]')
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
const secondSrc = await page.$eval('audio[data-active]', (audio) => audio.dataset.id)
if (secondSrc !== 'doha-2') throw new Error(`expected doha-2, got ${secondSrc}`)
await shot('ipad-verse-2')

await page.click('[aria-label="How to listen"] button:nth-child(2)')
await page.waitForFunction(() => document.querySelector('[aria-selected="true"]')?.textContent?.includes('Practice'))
const practiceLoop = await page.$eval('audio[data-active]', (audio) => audio.loop)
if (practiceLoop) throw new Error('practice should not loop')
const stillLearnCopy = await page.evaluate(() => document.body.innerText.includes('Practice from the very start'))
if (!stillLearnCopy) throw new Error('practice-from-start control missing')
const paused = await page.$eval('audio[data-active]', (audio) => audio.paused)
if (paused) await page.click('.play-btn')
await page.waitForFunction(() => {
  const audio = document.querySelector('audio[data-active]')
  return audio && Number.isFinite(audio.duration) && audio.duration > 1 && !audio.paused
})
await page.waitForFunction(() => {
  const audio = document.querySelector('audio[data-active]')
  return audio && !audio.paused && audio.seekable.length > 0 && audio.seekable.end(0) > 5
})
await page.evaluate(() => {
  const audio = document.querySelector('audio[data-active]')
  const end = audio.seekable.end(audio.seekable.length - 1)
  audio.currentTime = Math.max(0, end - 0.3)
})
await page.waitForFunction(() => document.querySelector('audio[data-active]')?.dataset.id === 'chaupai-1-2', { timeout: 8000 })
await page.waitForFunction(() => document.querySelector('.verse-lines')?.textContent?.includes('Jai Hanuman'))
await shot('ipad-practice-advance')

await page.evaluate(() => {
  localStorage.setItem(
    'little-chalisa-v1',
    JSON.stringify({ v: 2, heardThrough: 23, pieceId: 'doha-close', mode: 'learn' }),
  )
})
await page.reload({ waitUntil: 'networkidle0' })
await page.waitForFunction(() => document.querySelector('.verse-lines')?.textContent?.includes('Pavantnai'))
await shot('ipad-closing')

for (const [id, file] of [
  ['chaupai-9-10', 'ipad-chaupai-9-10'],
  ['chaupai-11-12', 'ipad-chaupai-11-12'],
  ['chaupai-17-18', 'ipad-chaupai-17-18'],
  ['chaupai-25-26', 'ipad-chaupai-25-26'],
]) {
  await page.evaluate((pieceId) => {
    localStorage.setItem(
      'little-chalisa-v1',
      JSON.stringify({ v: 2, heardThrough: 24, pieceId, mode: 'learn' }),
    )
  }, id)
  await page.reload({ waitUntil: 'networkidle0' })
  await page.waitForFunction(
    (pieceId) => document.querySelector('audio[data-active]')?.dataset.id === pieceId,
    {},
    id,
  )
  await shot(file)
}

// A paired chaupai shows both verses' stills: 4 on each side, first verse on the left.
await page.evaluate(() => {
  localStorage.setItem('little-chalisa-v1', JSON.stringify({ v: 2, heardThrough: 24, pieceId: 'chaupai-1-2', mode: 'learn' }))
})
await page.reload({ waitUntil: 'networkidle0' })
await page.waitForFunction(() => document.querySelectorAll('.pic-btn').length === 8)
const pair = await page.evaluate(() => {
  const pics = [...document.querySelectorAll('.pic-btn')].map((el) => {
    const r = el.getBoundingClientRect()
    return { x: r.x, w: r.width, h: r.height, src: el.querySelector('img')?.getAttribute('src') ?? '' }
  })
  return { pics, innerWidth: window.innerWidth, scrollWidth: document.documentElement.scrollWidth }
})
const left = pair.pics.filter((pic) => pic.x < pair.innerWidth / 2)
if (left.length !== 4 || !left.every((pic) => pic.src.includes('chaupai-1-'))) {
  throw new Error(`pair left rail should hold chaupai 1 stills ${JSON.stringify(pair.pics)}`)
}
if (!pair.pics.slice(4).every((pic) => pic.src.includes('chaupai-2-'))) throw new Error('pair right rail should hold chaupai 2 stills')
if (pair.pics.some((pic) => pic.w < 90 || pic.h < 90)) throw new Error(`pair tiles too small ${JSON.stringify(pair.pics)}`)
if (pair.scrollWidth > pair.innerWidth + 2) throw new Error('pair layout overflows')
await shot('ipad-pair')

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 })
await page.evaluate(() => localStorage.clear())
await page.reload({ waitUntil: 'networkidle0' })
await page.waitForSelector('.verse-lines')
const phone = await page.evaluate(() => {
  const pics = [...document.querySelectorAll('.pic-btn')].map((el) => {
    const r = el.getBoundingClientRect()
    return { x: r.x, y: r.y, w: r.width, h: r.height, bottom: r.bottom }
  })
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

// ---------- Picture Book ----------
await page.setViewport({ width: 1180, height: 820, deviceScaleFactor: 1 })
await page.evaluate(() => localStorage.clear())
await page.reload({ waitUntil: 'networkidle0' })
await page.waitForSelector('.mode-switch')
const tabs = await page.$$eval('.mode-switch button span', (n) => n.map((e) => e.textContent))
if (!tabs.includes('Picture Book')) throw new Error(`no Picture Book tab: ${tabs}`)
await page.evaluate(() => [...document.querySelectorAll('.mode-switch button')].find((b) => b.textContent.includes('Picture Book')).click())
await page.waitForSelector('.book-page[data-page="cover"]')
await page.click('.book-arrow[aria-label="Next page"]')
await page.waitForSelector('.book-page[data-page="doha-1"]')
const bookFirst = await page.$eval('.book-dev', (e) => e.textContent)
if (!bookFirst.includes('श्रीगुरु')) throw new Error(`doha-1 Devanagari missing: ${bookFirst}`)
// swipe left turns forward
const box = await page.$eval('.book-art', (e) => { const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 } })
await page.mouse.move(box.x + 150, box.y)
await page.mouse.down()
await page.mouse.move(box.x - 150, box.y, { steps: 6 })
await page.mouse.up()
await page.waitForSelector('.book-page[data-page="doha-2"]')
// jump to chaupai-2 (page 4) and tap the verse: it must play only the second half of chaupai-1-2
await page.evaluate(() => localStorage.setItem('little-chalisa-book', JSON.stringify({ page: 4, readToMe: false })))
await page.reload({ waitUntil: 'networkidle0' })
await page.waitForSelector('.book-page[data-page="chaupai-2"]')
const bookImg = await page.$eval('.book-art img', (img) => new Promise((ok) => (img.complete ? ok(img.naturalWidth) : img.addEventListener('load', () => ok(img.naturalWidth)))))
if (!(bookImg >= 1000)) throw new Error(`book art not loaded ${bookImg}`)
await page.click('.book-verse')
await page.waitForSelector('.book-verse span.lit', { timeout: 8000 })
const half = await page.$eval('.book audio', (a) => ({ src: a.src, t: a.currentTime }))
if (!half.src.includes('chaupai-1-2.m4a') || half.t < 9) throw new Error(`chaupai-2 should start mid-clip ${JSON.stringify(half)}`)
const bookLayout = await page.evaluate(() => {
  const art = document.querySelector('.book-art').getBoundingClientRect()
  const text = document.querySelector('.book-text').getBoundingClientRect()
  const arrows = [...document.querySelectorAll('.book-arrow')].map((b) => b.getBoundingClientRect().width)
  return { side: text.left >= art.right - 2, arrows, sw: document.documentElement.scrollWidth, iw: innerWidth, sh: document.documentElement.scrollHeight, ih: innerHeight }
})
if (!bookLayout.side) throw new Error('iPad book should sit art beside text')
if (bookLayout.arrows.some((w) => w < 56)) throw new Error('book arrows too small')
if (bookLayout.sw > bookLayout.iw + 2 || bookLayout.sh > bookLayout.ih + 2) throw new Error(`iPad book overflows ${JSON.stringify(bookLayout)}`)
await new Promise((r) => setTimeout(r, 900))
await shot('book-ipad')
await page.click('.book-verse')
// Read to me on chaupai-1: plays the first half, stops at the split, turns to chaupai-2 by itself
await page.evaluate(() => localStorage.setItem('little-chalisa-book', JSON.stringify({ page: 3, readToMe: false })))
await page.reload({ waitUntil: 'networkidle0' })
await page.waitForSelector('.book-page[data-page="chaupai-1"]')
await page.click('.book-read input')
await page.waitForSelector('.book-page[data-page="chaupai-2"]', { timeout: 20000 })
await page.waitForFunction(() => { const a = document.querySelector('.book audio'); return a && !a.paused && a.currentTime > 9 }, { timeout: 8000 })
await page.click('.book-read input')

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 })
await page.evaluate(() => localStorage.setItem('little-chalisa-book', JSON.stringify({ page: 4, readToMe: false })))
await page.reload({ waitUntil: 'networkidle0' })
await page.waitForSelector('.book-page[data-page="chaupai-2"]')
const bookPhone = await page.evaluate(() => {
  const art = document.querySelector('.book-art').getBoundingClientRect()
  const text = document.querySelector('.book-text').getBoundingClientRect()
  return { stacked: text.top >= art.bottom - 2, sw: document.documentElement.scrollWidth, iw: innerWidth }
})
if (!bookPhone.stacked || bookPhone.sw > bookPhone.iw + 2) throw new Error(`phone book should stack ${JSON.stringify(bookPhone)}`)
await new Promise((r) => setTimeout(r, 900))
await shot('book-phone')
await page.evaluate(() => localStorage.clear())

if (errors.length) {
  console.error(errors.join('\n'))
  throw new Error('page errors')
}

console.log('smoke ok')
await browser.close()
