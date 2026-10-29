import { useEffect, useRef, useState } from 'react'
import { bookPages } from '../data/book'
import { audioUrl } from '../data/pieces'
import { clampPage, lineAt } from '../bookPlan'

const BOOK_KEY = 'little-chalisa-book'
const LAST = bookPages.length - 1

function loadBook(): { page: number; readToMe: boolean } {
  try {
    const raw = JSON.parse(localStorage.getItem(BOOK_KEY) ?? '{}')
    return { page: clampPage(raw.page), readToMe: raw.readToMe === true }
  } catch {
    return { page: 0, readToMe: false }
  }
}

export function PictureBook() {
  const initial = useRef(loadBook()).current
  const [page, setPage] = useState(initial.page)
  const [readToMe, setReadToMe] = useState(initial.readToMe)
  const [playing, setPlaying] = useState(false)
  const [glow, setGlow] = useState(-1)
  const [turn, setTurn] = useState<'next' | 'prev'>('next')
  const audio = useRef<HTMLAudioElement | null>(null)
  const raf = useRef(0)
  const timer = useRef(0)
  const readRef = useRef(readToMe)
  const pageRef = useRef(page)
  readRef.current = readToMe
  pageRef.current = page
  const current = bookPages[page]

  useEffect(() => {
    try {
      localStorage.setItem(BOOK_KEY, JSON.stringify({ page, readToMe }))
    } catch {
      /* not saved; fine */
    }
  }, [page, readToMe])

  function stop() {
    cancelAnimationFrame(raf.current)
    window.clearTimeout(timer.current)
    audio.current?.pause()
    setPlaying(false)
    setGlow(-1)
  }

  useEffect(() => stop, [])

  function go(next: number, autoplay = false) {
    const target = Math.min(Math.max(next, 0), LAST)
    if (target === pageRef.current) return
    stop()
    setTurn(target > pageRef.current ? 'next' : 'prev')
    pageRef.current = target
    setPage(target)
    if (autoplay) timer.current = window.setTimeout(() => play(target), 450)
  }

  function finished(at: number) {
    setPlaying(false)
    setGlow(-1)
    if (readRef.current && at < LAST) timer.current = window.setTimeout(() => go(at + 1, true), 700)
  }

  function play(at = pageRef.current) {
    const el = audio.current
    const clip = bookPages[at].audio
    if (!el) return
    stop()
    if (!clip) {
      // Cover: no sound. In Read to me, linger a moment then turn the page.
      if (readRef.current) timer.current = window.setTimeout(() => go(at + 1, true), 1800)
      return
    }
    const src = audioUrl(clip.clip)
    const begin = () => {
      el.currentTime = clip.start
      el.volume = 1
      void el.play().then(
        () => {
          setPlaying(true)
          const tick = () => {
            const t = el.currentTime
            const left = clip.end - t
            if (left <= 0.12) el.volume = Math.max(0, left / 0.12)
            if (t >= clip.end || el.ended) {
              el.pause()
              finished(at)
              return
            }
            setGlow(lineAt(bookPages[at].lines, (t - clip.start) / (clip.end - clip.start)))
            raf.current = requestAnimationFrame(tick)
          }
          raf.current = requestAnimationFrame(tick)
        },
        () => setPlaying(false),
      )
    }
    if (el.dataset.clip !== clip.clip) {
      el.dataset.clip = clip.clip
      el.src = src
      el.load()
      el.addEventListener('loadedmetadata', begin, { once: true })
    } else begin()
  }

  function toggleRead() {
    const next = !readToMe
    readRef.current = next
    setReadToMe(next)
    if (next) play()
    else stop()
  }

  // Swipe
  const touch = useRef<{ x: number; y: number } | null>(null)
  function onPointerDown(e: React.PointerEvent) {
    touch.current = { x: e.clientX, y: e.clientY }
  }
  function onPointerUp(e: React.PointerEvent) {
    const start = touch.current
    touch.current = null
    if (!start) return
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) go(page + (dx < 0 ? 1 : -1), readRef.current)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(pageRef.current + 1, readRef.current)
      if (e.key === 'ArrowLeft') go(pageRef.current - 1, readRef.current)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const isCover = current.id === 'cover'

  return (
    <div className="book min-h-0 flex-1" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
      <article key={current.id} className={`book-page turn-${turn} ${isCover ? 'is-cover' : ''}`} data-page={current.id}>
        <div className="book-art">
          <img src={current.image} alt={isCover ? 'Hanuman on a mountain at sunrise' : `Picture for ${current.title}`} draggable={false} />
          {isCover && (
            <div className="book-cover-title">
              <h2 className="font-display">{current.title}</h2>
              <p>{current.meaning}</p>
            </div>
          )}
        </div>
        {!isCover && (
          <div className="book-text">
            <p className="book-label">
              {current.title} · page {page} of {LAST}
            </p>
            <button
              type="button"
              className={`book-verse ${playing ? 'is-playing' : ''}`}
              onClick={() => (playing ? stop() : play())}
              aria-label={`${playing ? 'Stop' : 'Play'} ${current.title}`}
            >
              <span className="book-dev" lang="hi">
                {current.devanagari.map((line, i) => (
                  <span key={i} className={glow >= 0 && Math.floor((glow * current.devanagari.length) / current.lines.length) === i ? 'lit' : ''}>
                    {line}
                  </span>
                ))}
              </span>
              <span className="book-roman">
                {current.lines.map((line, i) => (
                  <span key={i} className={glow === i ? 'lit' : ''}>
                    {line}
                  </span>
                ))}
              </span>
              <span className="book-tap">{playing ? '■ Tap to stop' : '▶ Tap the words to hear them'}</span>
            </button>
            <p className="book-meaning">{current.meaning}</p>
          </div>
        )}
      </article>

      <nav className="book-nav" aria-label="Turn pages">
        <button type="button" className="book-arrow" aria-label="Previous page" disabled={page === 0} onClick={() => go(page - 1, readToMe)}>
          ‹
        </button>
        <div className="book-middle">
          <label className="book-read">
            <input type="checkbox" role="switch" checked={readToMe} onChange={toggleRead} />
            <span>Read to me</span>
          </label>
          <input
            className="book-scrub"
            type="range"
            min={0}
            max={LAST}
            value={page}
            aria-label="Page"
            onChange={(e) => go(Number(e.target.value))}
          />
          <span className="book-count">{page === 0 ? 'Cover' : `${page} / ${LAST}`}</span>
        </div>
        <button type="button" className="book-arrow" aria-label="Next page" disabled={page === LAST} onClick={() => go(page + 1, readToMe)}>
          ›
        </button>
      </nav>
      <audio ref={audio} preload="auto" playsInline onEnded={() => finished(pageRef.current)} />
    </div>
  )
}
