import { useEffect, useRef, useState } from 'react'
import { PictureButton } from './components/PictureButton'
import { audioUrl, pieceIds, pieceLabel, pieces, appName, tagline, tileUrl } from './data/pieces'
import {
  bumpHeard,
  loadSave,
  unlockedThrough,
  writeSave,
  type Mode,
} from './progress'

const TOTAL = pieces.length

export function App() {
  const initial = useRef(loadSave(pieceIds)).current
  const [heardThrough, setHeardThrough] = useState(initial.heardThrough)
  const [pieceId, setPieceId] = useState(initial.pieceId)
  const [mode, setMode] = useState<Mode>(initial.mode)
  const [playing, setPlaying] = useState(false)
  const [ratio, setRatio] = useState(0)
  const [hint, setHint] = useState('')
  const [finished, setFinished] = useState(false)
  const [audioError, setAudioError] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const heardRef = useRef(heardThrough)
  const modeRef = useRef(mode)
  const playingRef = useRef(playing)
  const pieceRef = useRef(pieces[0])
  heardRef.current = heardThrough
  modeRef.current = mode
  playingRef.current = playing

  const piece = pieces.find((item) => item.id === pieceId) ?? pieces[0]
  pieceRef.current = piece
  const openThrough = unlockedThrough(heardThrough, TOTAL)

  useEffect(() => {
    writeSave({ v: 1, heardThrough, pieceId, mode })
  }, [heardThrough, pieceId, mode])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = audioUrl(piece.id)
    audio.dataset.id = piece.id
    audio.loop = modeRef.current === 'learn'
    audio.load()
    // Mount only. Later piece changes go through the gesture handlers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const warmed = useRef(false)
  useEffect(() => {
    if (!playing || warmed.current) return
    warmed.current = true
    void (async () => {
      for (const id of pieceIds) {
        try {
          await fetch(audioUrl(id))
        } catch {
          /* A later visit can finish saving verses for offline. */
        }
      }
    })()
  }, [playing])

  useEffect(() => {
    document.title = `${pieceLabel(piece)} · ${appName}`
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: pieceLabel(piece),
        artist: appName,
        album: 'Hanuman Chalisa',
      })
    }
  }, [piece])

  useEffect(() => {
    const node = document.getElementById(`bead-${piece.id}`)
    const row = node?.parentElement
    if (!node || !row) return
    const left = node.offsetLeft - row.clientWidth / 2 + node.clientWidth / 2
    row.scrollTo({ left, behavior: 'smooth' })
  }, [piece.id])

  useEffect(() => {
    if (!hint) return
    const timer = window.setTimeout(() => setHint(''), 2400)
    return () => window.clearTimeout(timer)
  }, [hint])

  function noteHeard(order: number) {
    const next = bumpHeard(heardRef.current, order, TOTAL)
    if (next !== heardRef.current) {
      heardRef.current = next
      setHeardThrough(next)
    }
  }

  function flash(message: string) {
    setHint(message)
  }

  function prepare(nextId: string) {
    const audio = audioRef.current
    if (!audio) return
    if (audio.dataset.id !== nextId) {
      audio.src = audioUrl(nextId)
      audio.dataset.id = nextId
      audio.load()
    }
    audio.loop = modeRef.current === 'learn'
    setRatio(0)
    setAudioError(false)
  }

  function startPlayback() {
    const audio = audioRef.current
    if (!audio) return
    playingRef.current = true
    setPlaying(true)
    audio.play().catch(() => {
      playingRef.current = false
      setPlaying(false)
    })
  }

  function goTo(order: number, autoplay: boolean) {
    if (order < 1) {
      flash('This is the first verse.')
      return
    }
    if (order > TOTAL) {
      flash('This is the last verse.')
      return
    }
    if (!autoplay && order > heardRef.current + 1) {
      flash('This one opens after you listen to the verse before it.')
      return
    }
    const next = pieces[order - 1]
    pieceRef.current = next
    setPieceId(next.id)
    setFinished(false)
    prepare(next.id)
    if (autoplay || playingRef.current) startPlayback()
  }

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    prepare(pieceRef.current.id)
    if (!audio.paused && playingRef.current) {
      audio.pause()
      playingRef.current = false
      setPlaying(false)
      return
    }
    startPlayback()
  }

  function chooseMode(next: Mode) {
    modeRef.current = next
    setMode(next)
    setFinished(false)
    const audio = audioRef.current
    if (audio) audio.loop = next === 'learn'
  }

  function onTime() {
    const audio = audioRef.current
    if (!audio || audio.dataset.id !== pieceRef.current.id) return
    if (!audio.duration || !Number.isFinite(audio.duration)) return
    setRatio(audio.currentTime / audio.duration)
    if (modeRef.current === 'learn' && audio.currentTime >= audio.duration * 0.9) {
      noteHeard(pieceRef.current.order)
    }
  }

  function onEnded() {
    const audio = audioRef.current
    if (!audio || audio.dataset.id !== pieceRef.current.id) return
    noteHeard(pieceRef.current.order)
    if (modeRef.current === 'learn') {
      const audio = audioRef.current
      if (!audio || audio.loop) return
      audio.currentTime = 0
      if (playingRef.current) void audio.play().catch(() => setPlaying(false))
      return
    }
    const order = pieceRef.current.order
    if (order < TOTAL) {
      goTo(order + 1, true)
      return
    }
    playingRef.current = false
    setPlaying(false)
    setFinished(true)
  }

  const status = audioError
    ? 'The sound did not load. Try once online, then it stays on this device.'
    : playing
      ? mode === 'learn'
        ? 'Playing this verse again and again'
        : 'Playing straight through'
      : 'Tap play when you are ready'

  return (
    <div className="app-shell px-3 py-3 md:px-5 md:py-4">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3">
        <div className="min-w-0">
          <p className="font-display text-3xl font-bold leading-none text-deep md:text-4xl">{appName}</p>
          <p className="mt-1 text-sm font-bold text-maroon/80 md:text-base">{tagline}</p>
        </div>
        <div className="mode-switch" role="tablist" aria-label="How to listen">
          <button type="button" role="tab" aria-selected={mode === 'learn'} onClick={() => chooseMode('learn')}>
            <span>Learn</span>
            <small>Again and again</small>
          </button>
          <button type="button" role="tab" aria-selected={mode === 'practice'} onClick={() => chooseMode('practice')}>
            <span>Practice</span>
            <small>All in a row</small>
          </button>
        </div>
      </header>

      <div className="stage min-h-0 flex-1">
        <div className="story-sides">
          <div className="tile-rail area-left">
            <PictureButton side="left" idea={piece.pictureIdeas[0]} src={tileUrl(piece.id, 0)} />
            <PictureButton side="left" idea={piece.pictureIdeas[1]} src={tileUrl(piece.id, 1)} />
          </div>
          <div className="tile-rail area-right">
            <PictureButton side="right" idea={piece.pictureIdeas[2]} src={tileUrl(piece.id, 2)} />
            <PictureButton side="right" idea={piece.pictureIdeas[3]} src={tileUrl(piece.id, 3)} />
          </div>
        </div>
        <section className="area-verse verse-card flex flex-col px-4 py-4 md:px-8 md:py-6" aria-live="polite">
          <p className="text-center text-sm font-extrabold uppercase tracking-wide text-saffron">
            {pieceLabel(piece)} · {piece.order} of {TOTAL}
          </p>
          <h1 className="sr-only">{piece.title}</h1>
          <div className="verse-lines mt-3 space-y-1 text-center">
            {piece.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="mt-4 text-center text-xs font-extrabold uppercase tracking-wide text-maroon/70">What it means</p>
          <p className="meaning mt-1 text-center">{piece.meaning}</p>

          {finished && (
            <div className="relative mx-auto mt-4 max-w-md rounded-3xl bg-gold/30 px-4 py-3 text-center">
              <p className="font-display text-2xl font-bold text-deep">You listened all the way through.</p>
              <p className="font-bold text-maroon">Jai Hanuman!</p>
              <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center gap-3" aria-hidden>
                {['#C8482A', '#F2C14E', '#6E9A62', '#8ECAE6', '#E07A3D'].map((color, index) => (
                  <span
                    key={color}
                    className="finish-dot inline-block h-2.5 w-2.5 rounded-full"
                    style={{ background: color, animationDelay: `${index * 0.08}s` }}
                  />
                ))}
              </div>
              <button
                type="button"
                className="mt-2 rounded-full bg-deep px-4 py-2 font-extrabold text-white"
                onClick={() => goTo(1, true)}
              >
                Start again
              </button>
            </div>
          )}

          <div className="transport mt-auto flex items-center justify-center gap-4 pt-5">
            <button
              type="button"
              className={`step-btn${piece.order <= 1 ? ' is-locked' : ''}`}
              aria-label="Previous verse"
              aria-disabled={piece.order <= 1}
              onClick={() => goTo(piece.order - 1, false)}
            >
              <SkipIcon direction="prev" />
            </button>
            <button
              type="button"
              className={`play-btn ${playing ? '' : 'waiting-play'}`}
              aria-label={playing ? 'Pause' : 'Play'}
              onClick={togglePlay}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              type="button"
              className={`step-btn${piece.order >= openThrough ? ' is-locked' : ''}`}
              aria-label="Next verse"
              aria-disabled={piece.order >= openThrough}
              onClick={() => goTo(piece.order + 1, false)}
            >
              <SkipIcon direction="next" />
            </button>
          </div>
          <div className="mx-auto mt-4 h-2 w-full max-w-md overflow-hidden rounded-full bg-saffron/15" aria-hidden>
            <div className="h-full rounded-full bg-saffron" style={{ width: `${Math.min(100, ratio * 100)}%` }} />
          </div>
          <p className="hint mt-2 text-center text-sm font-bold text-maroon/80">{hint || status}</p>
          {mode === 'practice' && piece.order !== 1 && (
            <button type="button" className="mx-auto mt-1 text-sm font-extrabold text-deep underline" onClick={() => goTo(1, true)}>
              Practice from the very start
            </button>
          )}
        </section>
      </div>

      <footer className="pt-3">
        <div className="bead-row" aria-label="Verses in order">
          {pieces.map((item) => {
            const heard = item.order <= heardThrough
            const locked = item.order > openThrough
            const current = item.id === piece.id
            return (
              <button
                key={item.id}
                id={`bead-${item.id}`}
                type="button"
                className={`bead ${heard ? 'heard' : ''} ${current ? 'current' : ''} ${locked ? 'locked' : ''}`}
                aria-label={`${pieceLabel(item)}${locked ? ', locked' : ''}${current ? ', current' : ''}`}
                aria-current={current ? 'true' : undefined}
                onClick={() => goTo(item.order, false)}
              >
                {item.order}
              </button>
            )
          })}
        </div>
        <p className="pb-1 text-center text-xs font-bold text-maroon/60">
          {heardThrough === TOTAL
            ? 'All 43 verses are open. Your place is saved only on this device.'
            : 'Verses open in order. Your place is saved only on this device.'}
        </p>
      </footer>

      <audio
        ref={audioRef}
        preload="auto"
        playsInline
        onTimeUpdate={onTime}
        onEnded={onEnded}
        onError={() => setAudioError(true)}
      />
    </div>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 48 48" className="mx-auto h-10 w-10" aria-hidden>
      <path d="M18 12 L36 24 L18 36 Z" fill="currentColor" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 48 48" className="mx-auto h-10 w-10" aria-hidden>
      <rect x="14" y="12" width="7" height="24" rx="2" fill="currentColor" />
      <rect x="27" y="12" width="7" height="24" rx="2" fill="currentColor" />
    </svg>
  )
}

function SkipIcon({ direction }: { direction: 'prev' | 'next' }) {
  const flip = direction === 'prev' ? 'scale(-1 1) translate(-48 0)' : ''
  return (
    <svg viewBox="0 0 48 48" className="mx-auto h-7 w-7" aria-hidden>
      <g transform={flip}>
        <path d="M16 12 L32 24 L16 36 Z" fill="currentColor" />
      </g>
    </svg>
  )
}
