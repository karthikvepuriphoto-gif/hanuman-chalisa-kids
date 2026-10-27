import { useId, type ReactNode } from 'react'
import type { SceneSpec } from './scenes'

type ItemProps = { pose?: string }

function Shadow() {
  return <ellipse cx="0" cy="58" rx="26" ry="6" fill="#5c3317" opacity="0.12" />
}

function Person({
  skin = '#F6C9A3',
  cloth = '#E07A3D',
  accent = '#F2C14E',
  ears = false,
  tail = false,
  crown = false,
  bun = false,
  beard = false,
  longHair = false,
  aura = false,
  crescent = false,
  child = false,
}: {
  skin?: string
  cloth?: string
  accent?: string
  ears?: boolean
  tail?: boolean
  crown?: boolean
  bun?: boolean
  beard?: boolean
  longHair?: boolean
  aura?: boolean
  crescent?: boolean
  child?: boolean
}) {
  const head = child ? 20 : 17
  return (
    <g>
      {aura && <ellipse cx="0" cy="8" rx="48" ry="62" fill="#FFE08A" opacity="0.55" />}
      <Shadow />
      {tail && (
        <path
          d="M16 30 C46 26 54 -8 34 -30"
          fill="none"
          stroke="#E08A3C"
          strokeWidth="7"
          strokeLinecap="round"
        />
      )}
      {ears && (
        <>
          <ellipse cx="-18" cy="-12" rx="7" ry="9" fill={skin} />
          <ellipse cx="18" cy="-12" rx="7" ry="9" fill={skin} />
          <ellipse cx="-18" cy="-12" rx="3.2" ry="5.5" fill="#E7A27A" />
          <ellipse cx="18" cy="-12" rx="3.2" ry="5.5" fill="#E7A27A" />
        </>
      )}
      <path d="M-14 28 Q-16 56 -6 58 Q0 48 0 34 Q0 48 6 58 Q16 56 14 28" fill={cloth} />
      <ellipse cx="0" cy="24" rx="20" ry="22" fill={cloth} />
      <ellipse cx="0" cy="18" rx="13" ry="9" fill={accent} />
      {longHair && (
        <path
          d="M-14 -28 Q-24 8 -12 22 M14 -28 Q24 8 12 22"
          stroke="#5C3317"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
      )}
      <circle cx="0" cy={child ? -16 : -14} r={head} fill={skin} />
      {bun && <circle cx="0" cy="-34" r="6.5" fill="#5C3317" />}
      {crescent && <path d="M8 -38 a6 6 0 1 0 0.2 0" fill="#F2C14E" />}
      {crown && <path d="M-13 -28 L-8 -42 L0 -32 L8 -42 L13 -28 Z" fill="#F2C14E" stroke="#C48A2A" strokeWidth="1" />}
      {beard && <path d="M-8 -6 Q0 8 8 -6 Q0 2 -8 -6" fill="#F7F1E6" />}
      <ellipse cx="-11" cy={child ? -12 : -10} rx="3.2" ry="1.8" fill="#F2A48A" opacity="0.75" />
      <ellipse cx="11" cy={child ? -12 : -10} rx="3.2" ry="1.8" fill="#F2A48A" opacity="0.75" />
      <circle cx="-6" cy={child ? -18 : -16} r="2.15" fill="#3A2418" />
      <circle cx="6" cy={child ? -18 : -16} r="2.15" fill="#3A2418" />
      <circle cx="-5.3" cy={child ? -18.8 : -16.8} r="0.7" fill="#fff" />
      <circle cx="6.7" cy={child ? -18.8 : -16.8} r="0.7" fill="#fff" />
      <path
        d={`M-5 ${child ? -10 : -8} Q0 ${child ? -5 : -3} 5 ${child ? -10 : -8}`}
        fill="none"
        stroke="#8C3A2F"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M0 -26 l1.5 3.4 h-3 z" fill="#C8482A" />
    </g>
  )
}

function Hanuman({ pose = 'stand' }: ItemProps) {
  const tilt = pose === 'fly' ? -16 : pose === 'bow' ? 12 : pose === 'sit' ? 0 : 0
  const squat = pose === 'sit' ? 'translate(0 10) scale(1 0.86)' : ''
  return (
    <g transform={`${squat} rotate(${tilt})`}>
      <Person
        ears
        tail
        skin="#F6B17A"
        cloth={pose === 'hero' ? '#F2C14E' : '#C8482A'}
        accent="#F8E2A0"
        crown={pose === 'hero' || pose === 'guard'}
        aura={pose === 'hero' || pose === 'glow' || pose === 'big'}
      />
      {pose === 'fly' && (
        <g stroke="#F2C14E" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M-46 0 H-28" />
          <path d="M-42 12 H-26" />
          <path d="M-40 -12 H-24" />
        </g>
      )}
    </g>
  )
}

function Rama() {
  return <Person skin="#7EB0D8" cloth="#F2C14E" accent="#C8482A" crown />
}
function Sita() {
  return <Person skin="#F3C7A1" cloth="#F0A0B4" accent="#F8E2A0" crown longHair />
}
function Lakshman() {
  return <Person skin="#8FC0D8" cloth="#F4A261" accent="#F2C14E" crown />
}
function ChildFig() {
  return <Person skin="#F6D3B0" cloth="#7EB6E0" accent="#F8E2A0" child />
}
function Shiva() {
  return <Person skin="#E7EEF2" cloth="#F4A261" accent="#F2C14E" bun crescent aura />
}
function Sage() {
  return <Person skin="#F0D2B0" cloth="#F4E1B5" accent="#E07A3D" bun beard />
}
function Sugriva() {
  return <Person ears tail skin="#E8A15A" cloth="#6E9A62" accent="#F2C14E" crown />
}
function Vibhishan() {
  return <Person skin="#F0D2B0" cloth="#5FA8A0" accent="#F2C14E" crown />
}
function Tulsidas() {
  return <Person skin="#F0D2B0" cloth="#F4E1B5" accent="#C8482A" bun beard />
}
function Anjani() {
  return <Person skin="#F3C7A1" cloth="#A8434A" accent="#F2C14E" longHair />
}
function Narad() {
  return <Person skin="#F0D2B0" cloth="#F2C14E" accent="#C8482A" bun beard />
}
function Saraswati() {
  return <Person skin="#F7E7D2" cloth="#F7F3EA" accent="#F2C14E" longHair crown />
}

function Lotus() {
  return (
    <g>
      {[0, 45, 90, 135].map((deg) => (
        <ellipse key={deg} cx="0" cy="-16" rx="10" ry="18" fill="#F4A0C0" transform={`rotate(${deg})`} />
      ))}
      <circle cx="0" cy="0" r="8" fill="#F2C14E" />
      <ellipse cx="0" cy="28" rx="16" ry="6" fill="#6E9A62" />
    </g>
  )
}

function Mirror() {
  return (
    <g>
      <rect x="-28" y="-36" width="56" height="68" rx="16" fill="#8ECAE6" stroke="#F2C14E" strokeWidth="6" />
      <path d="M-16 -20 Q0 -8 10 -24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <circle cx="0" cy="6" r="10" fill="#F8E2A0" opacity="0.85" />
      <path d="M-18 44 h36" stroke="#C48A2A" strokeWidth="6" strokeLinecap="round" />
    </g>
  )
}

function Fruits() {
  const items = [
    { x: -36, y: -10, c: '#E07A3D' },
    { x: 36, y: -6, c: '#C8482A' },
    { x: -12, y: 28, c: '#6E9A62' },
    { x: 18, y: 24, c: '#F2C14E' },
  ]
  return (
    <g>
      {items.map((fruit) => (
        <g key={fruit.c} transform={`translate(${fruit.x} ${fruit.y})`}>
          <circle r="18" fill={fruit.c} />
          <ellipse cx="-5" cy="-6" rx="5" ry="3" fill="#fff" opacity="0.35" />
          <path d="M0 -16 Q6 -26 2 -18" stroke="#6E9A62" strokeWidth="3" fill="none" />
          <ellipse cx="6" cy="-18" rx="6" ry="3" fill="#8FBF73" />
        </g>
      ))}
    </g>
  )
}

function Sun({ fruit = false }: { fruit?: boolean }) {
  return (
    <g>
      {Array.from({ length: 10 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1="-34"
          x2="0"
          y2="-46"
          stroke="#F2C14E"
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${i * 36})`}
        />
      ))}
      <circle r="28" fill={fruit ? '#F2A14A' : '#F2C14E'} />
      <ellipse cx="-8" cy="-8" rx="8" ry="5" fill="#fff" opacity="0.35" />
      {fruit && <path d="M-4 -26 Q8 -40 2 -24" stroke="#6E9A62" strokeWidth="3" fill="#8FBF73" />}
    </g>
  )
}

function Mountain() {
  return (
    <g>
      <path d="M-70 40 L-20 -40 L10 10 L30 -24 L70 40 Z" fill="#8ECAE6" />
      <path d="M-20 -40 L-4 -10 L10 10 L-36 10 Z" fill="#fff" opacity="0.85" />
      <circle cx="4" cy="6" r="3" fill="#6E9A62" />
      <circle cx="-8" cy="12" r="2.4" fill="#8FBF73" />
      <circle cx="14" cy="14" r="2.2" fill="#F7F3EA" />
    </g>
  )
}

function Heart() {
  return <path d="M0 18 C-28 0 -18 -22 0 -8 C18 -22 28 0 0 18 Z" fill="#E07A3D" />
}

function Book() {
  return (
    <g>
      <path d="M-32 20 Q-8 -8 0 8 Q8 -8 32 20 L0 28 Z" fill="#F4E1B5" stroke="#C48A2A" strokeWidth="2" />
      <path d="M0 8 V28" stroke="#C8482A" strokeWidth="2" />
      <path d="M-22 8 H-8 M-22 14 H-10" stroke="#8C3A2F" strokeWidth="2" strokeLinecap="round" />
    </g>
  )
}

function Mace() {
  return (
    <g>
      <rect x="-4" y="-10" width="8" height="62" rx="3" fill="#C48A2A" />
      <circle cy="-22" r="18" fill="#F2C14E" stroke="#C8482A" strokeWidth="3" />
    </g>
  )
}

function Flag() {
  return (
    <g>
      <rect x="-4" y="-50" width="6" height="100" rx="2" fill="#C48A2A" />
      <path d="M2 -46 L48 -28 L2 -10 Z" fill="#C8482A" />
      <circle cx="24" cy="-28" r="5" fill="#F2C14E" />
    </g>
  )
}

function Earrings() {
  return (
    <g>
      <circle cx="-22" cy="0" r="12" fill="none" stroke="#F2C14E" strokeWidth="5" />
      <circle cx="22" cy="0" r="12" fill="none" stroke="#F2C14E" strokeWidth="5" />
      <circle cx="-22" cy="16" r="5" fill="#E07A3D" />
      <circle cx="22" cy="16" r="5" fill="#E07A3D" />
    </g>
  )
}

function Curls() {
  return (
    <g fill="none" stroke="#5C3317" strokeWidth="5" strokeLinecap="round">
      <path d="M-30 -10 Q-10 -30 0 -8 Q10 -28 30 -8" />
      <path d="M-24 8 Q-8 -6 0 10 Q10 -6 24 10" />
      <path d="M-16 22 Q0 8 16 22" />
    </g>
  )
}

function Thread() {
  return (
    <g>
      <path d="M-30 -20 Q0 30 34 -16" fill="none" stroke="#F2C14E" strokeWidth="7" strokeLinecap="round" />
      <path d="M-30 -20 Q0 24 34 -16" fill="none" stroke="#C8482A" strokeWidth="2" />
    </g>
  )
}

function Letter() {
  return (
    <g>
      <rect x="-28" y="-18" width="56" height="40" rx="6" fill="#F7F3EA" stroke="#C48A2A" strokeWidth="3" />
      <path d="M-24 -12 L0 8 L24 -12" fill="none" stroke="#E07A3D" strokeWidth="3" />
      <circle cy="2" r="5" fill="#C8482A" />
    </g>
  )
}

function Wind() {
  return (
    <g fill="none" stroke="#8ECAE6" strokeWidth="5" strokeLinecap="round">
      <path d="M-40 0 H20 Q36 0 36 -12" />
      <path d="M-30 16 H28" />
      <path d="M-20 -16 H10 Q24 -16 24 -28" />
    </g>
  )
}

function Worlds() {
  return (
    <g>
      <circle cx="-34" cy="10" r="22" fill="#8FBF73" />
      <circle cx="0" cy="-8" r="22" fill="#8ECAE6" />
      <circle cx="36" cy="12" r="22" fill="#F2C14E" />
      <circle cx="36" cy="12" r="4" fill="#fff" />
      <circle cx="28" cy="4" r="2" fill="#fff" />
    </g>
  )
}

function Blob() {
  return (
    <g>
      <ellipse cx="0" cy="8" rx="22" ry="18" fill="#B9A0D6" />
      <circle cx="-8" cy="4" r="2" fill="#3A2418" />
      <circle cx="8" cy="4" r="2" fill="#3A2418" />
      <path d="M-6 12 Q0 8 6 12" fill="none" stroke="#5C3317" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  )
}

function Notes() {
  return (
    <g fill="#C8482A">
      <circle cx="-16" cy="10" r="7" />
      <circle cx="12" cy="4" r="7" />
      <rect x="-12" y="-28" width="4" height="38" />
      <rect x="16" y="-34" width="4" height="38" />
      <path d="M-8 -28 H20 V-18 H-8 Z" />
    </g>
  )
}

function Gate() {
  return (
    <g>
      <path d="M-50 50 V-10 Q0 -70 50 -10 V50" fill="#F4E1B5" stroke="#C48A2A" strokeWidth="4" />
      <rect x="-16" y="-4" width="32" height="54" rx="4" fill="#C8482A" />
      <circle cy="22" r="3" fill="#F2C14E" />
    </g>
  )
}

function Flames() {
  return (
    <g>
      {[-28, 0, 28].map((x, i) => (
        <path
          key={x}
          d={`M${x} 20 C${x - 14} 20 ${x - 16} -8 ${x} -28 C${x + 16} -8 ${x + 14} 20 ${x} 20 Z`}
          fill={i === 1 ? '#F2C14E' : '#E07A3D'}
        />
      ))}
    </g>
  )
}

function Palace() {
  return (
    <g>
      <rect x="-40" y="-4" width="80" height="50" fill="#F4E1B5" stroke="#C48A2A" strokeWidth="3" />
      <path d="M-44 -4 L0 -40 L44 -4 Z" fill="#C8482A" />
      <circle cy="-28" r="6" fill="#F2C14E" />
      <rect x="-8" y="16" width="16" height="30" fill="#8C3A2F" />
    </g>
  )
}

function Ring() {
  return (
    <g>
      <circle r="16" fill="none" stroke="#F2C14E" strokeWidth="7" />
      <circle cx="0" cy="-16" r="5" fill="#C8482A" />
    </g>
  )
}

function PathStones() {
  return (
    <g>
      <path d="M-50 20 Q0 -10 50 16" fill="none" stroke="#E7C8A4" strokeWidth="16" strokeLinecap="round" />
      <circle cx="-20" cy="8" r="7" fill="#F7F3EA" />
      <circle cx="6" cy="0" r="6" fill="#8FBF73" />
      <circle cx="30" cy="10" r="5" fill="#F2C14E" />
    </g>
  )
}

function Cloud() {
  return (
    <g fill="#F7F3EA">
      <ellipse cx="0" cy="6" rx="28" ry="16" />
      <ellipse cx="-16" cy="0" rx="14" ry="12" />
      <ellipse cx="14" cy="-2" rx="16" ry="12" />
    </g>
  )
}

function Shield() {
  return (
    <g>
      <path d="M0 36 C-28 20 -28 -16 0 -32 C28 -16 28 20 0 36 Z" fill="#F2C14E" stroke="#C8482A" strokeWidth="3" />
      <path d="M0 16 C-12 8 -10 -6 0 -14 C10 -6 12 8 0 16 Z" fill="#C8482A" />
    </g>
  )
}

function Beads() {
  const dots = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2
    return [Math.cos(a) * 28, Math.sin(a) * 18]
  })
  return (
    <g>
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 7 : 5} fill={i % 2 ? '#C8482A' : '#F2C14E'} />
      ))}
    </g>
  )
}

function Jar() {
  return (
    <g>
      <path d="M-18 -8 H18 L14 28 H-14 Z" fill="#F2C14E" stroke="#C48A2A" strokeWidth="3" />
      <rect x="-12" y="-20" width="24" height="12" rx="3" fill="#C8482A" />
      <path d="M0 4 C-8 4 -8 16 0 16 C8 16 8 4 0 4 Z" fill="#C8482A" />
    </g>
  )
}

function Ribbon() {
  return (
    <g fill="none" stroke="#E07A3D" strokeWidth="6" strokeLinecap="round">
      <path d="M-40 10 Q-10 -20 0 8" />
      <path d="M8 0 Q30 20 46 -8" />
      <circle cx="4" cy="6" r="5" fill="#F2C14E" stroke="none" />
    </g>
  )
}

function Gems() {
  const colors = ['#E07A3D', '#8ECAE6', '#6E9A62', '#F2C14E', '#C8482A', '#B9A0D6', '#F4A0C0', '#7EB0D8', '#F8E2A0']
  return (
    <g>
      {colors.map((color, i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        return <circle key={color} cx={-28 + col * 28} cy={-20 + row * 24} r="9" fill={color} />
      })}
    </g>
  )
}

function Seasons() {
  return (
    <g>
      <circle cx="-42" cy="0" r="14" fill="#F4A0C0" />
      <circle cx="-14" cy="0" r="14" fill="#F2C14E" />
      <circle cx="14" cy="0" r="14" fill="#E07A3D" />
      <circle cx="42" cy="0" r="14" fill="#D7EEF8" />
    </g>
  )
}

function City() {
  return (
    <g>
      {[-36, 0, 36].map((x) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <path d="M-16 28 V-8 Q0 -32 16 -8 V28 Z" fill="#F4E1B5" stroke="#C48A2A" strokeWidth="2" />
          <rect x="-4" y="8" width="8" height="20" fill="#C8482A" />
          <circle cy="-12" r="3" fill="#F2C14E" />
        </g>
      ))}
    </g>
  )
}

function Rope() {
  return (
    <g fill="none" stroke="#C48A2A" strokeWidth="6" strokeLinecap="round">
      <path d="M-46 0 Q-24 -16 -8 0" />
      <path d="M10 0 Q26 16 46 0" />
    </g>
  )
}

function Dust() {
  return (
    <g fill="#F2C14E">
      <circle cx="-20" cy="-10" r="4" />
      <circle cx="0" cy="-22" r="3" />
      <circle cx="18" cy="-6" r="5" />
      <circle cx="8" cy="12" r="3" />
      <circle cx="-12" cy="14" r="2.5" />
    </g>
  )
}

function Star() {
  return <path d="M0 -28 L6 -8 L28 -8 L10 4 L16 26 L0 12 L-16 26 L-10 4 L-28 -8 L-6 -8 Z" fill="#F2C14E" />
}

function Baskets() {
  return (
    <g>
      {[-32, 0, 32].map((x) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <path d="M-14 -4 H14 L10 18 H-10 Z" fill="#E7C8A4" stroke="#C48A2A" strokeWidth="2" />
          <rect x="-12" y="-10" width="24" height="8" fill="#6E9A62" />
        </g>
      ))}
    </g>
  )
}

function Diya() {
  return (
    <g>
      <path d="M-22 8 Q0 28 22 8 Q0 20 -22 8 Z" fill="#C8482A" />
      <path d="M0 6 C-8 6 -6 -16 0 -24 C6 -16 8 6 0 6 Z" fill="#F2C14E" />
    </g>
  )
}

function Veena() {
  return (
    <g>
      <path d="M-30 16 Q0 -10 30 -20" fill="none" stroke="#C48A2A" strokeWidth="4" />
      <ellipse cx="-30" cy="18" rx="12" ry="8" fill="#E07A3D" />
      <circle cx="32" cy="-22" r="8" fill="#F2C14E" />
    </g>
  )
}

function Baby() {
  return (
    <g transform="scale(0.55)">
      <Hanuman />
    </g>
  )
}

function Bow() {
  return (
    <g fill="none" stroke="#C48A2A" strokeWidth="4">
      <path d="M-8 -30 Q28 0 -8 30" />
      <path d="M-8 -30 L-8 30" stroke="#5C3317" />
    </g>
  )
}

function Singers() {
  const colors = ['#F4A261', '#7EB0D8', '#F0A0B4']
  return (
    <g>
      {colors.map((cloth, i) => (
        <g key={cloth} transform={`translate(${-36 + i * 36} 0)`}>
          <ellipse cx="0" cy="16" rx="12" ry="14" fill={cloth} />
          <circle r="10" fill="#F6C9A3" />
          <circle cx="-3" cy="-1" r="1.3" />
          <circle cx="3" cy="-1" r="1.3" />
          <path d="M-3 4 Q0 7 3 4" fill="none" stroke="#8C3A2F" strokeWidth="1.2" />
        </g>
      ))}
    </g>
  )
}

function Bowing() {
  return (
    <g>
      {[-30, 6, 40].map((x) => (
        <g key={x} transform={`translate(${x} 8) rotate(18)`}>
          <ellipse cx="0" cy="10" rx="12" ry="14" fill="#F4E1B5" />
          <circle cy="-8" r="9" fill="#F0D2B0" />
        </g>
      ))}
    </g>
  )
}

function HomeHeart() {
  return (
    <g>
      <Heart />
      <rect x="-8" y="2" width="16" height="16" rx="2" fill="#F4E1B5" />
      <circle cy="8" r="2" fill="#C8482A" />
    </g>
  )
}

function Friends() {
  return (
    <g>
      <g transform="translate(-18 0) scale(0.7)">
        <ChildFig />
      </g>
      <g transform="translate(22 0) scale(0.7)">
        <ChildFig />
      </g>
    </g>
  )
}

const DRAW: Record<string, (pose?: string) => ReactNode> = {
  hanuman: (pose) => <Hanuman pose={pose} />,
  rama: () => <Rama />,
  sita: () => <Sita />,
  lakshman: () => <Lakshman />,
  child: () => <ChildFig />,
  shiva: () => <Shiva />,
  sage: () => <Sage />,
  sugriva: () => <Sugriva />,
  vibhishan: () => <Vibhishan />,
  tulsidas: () => <Tulsidas />,
  anjani: () => <Anjani />,
  narad: () => <Narad />,
  saraswati: () => <Saraswati />,
  lotus: () => <Lotus />,
  mirror: () => <Mirror />,
  fruits: () => <Fruits />,
  sun: () => <Sun />,
  sunfruit: () => <Sun fruit />,
  mountain: () => <Mountain />,
  heart: () => <Heart />,
  book: () => <Book />,
  mace: () => <Mace />,
  flag: () => <Flag />,
  earrings: () => <Earrings />,
  curls: () => <Curls />,
  thread: () => <Thread />,
  letter: () => <Letter />,
  wind: () => <Wind />,
  worlds: () => <Worlds />,
  blob: () => <Blob />,
  notes: () => <Notes />,
  gate: () => <Gate />,
  flames: () => <Flames />,
  palace: () => <Palace />,
  ring: () => <Ring />,
  path: () => <PathStones />,
  cloud: () => <Cloud />,
  shield: () => <Shield />,
  beads: () => <Beads />,
  jar: () => <Jar />,
  ribbon: () => <Ribbon />,
  gems: () => <Gems />,
  seasons: () => <Seasons />,
  city: () => <City />,
  rope: () => <Rope />,
  dust: () => <Dust />,
  star: () => <Star />,
  baskets: () => <Baskets />,
  diya: () => <Diya />,
  veena: () => <Veena />,
  baby: () => <Baby />,
  bow: () => <Bow />,
  singers: () => <Singers />,
  bowing: () => <Bowing />,
  homeheart: () => <HomeHeart />,
  friends: () => <Friends />,
}

export const ART_KEYS = Object.keys(DRAW)

function Backdrop({ kind }: { kind: SceneSpec['bg'] }) {
  const sky =
    kind === 'night'
      ? ['#2E4A7A', '#F2C14E']
      : kind === 'cosmos'
        ? ['#6E8CC0', '#F8E2A0']
        : kind === 'dawn' || kind === 'lanka'
          ? ['#F6B17A', '#8ECAE6']
          : ['#F8D7A8', '#8ECAE6']
  return (
    <g>
      <rect width="200" height="280" fill={sky[1]} />
      <rect width="200" height="200" fill={sky[0]} />
      {kind !== 'night' && kind !== 'cosmos' && (
        <>
          <circle cx="164" cy="42" r="18" fill="#F2C14E" />
          <ellipse cx="40" cy="48" rx="18" ry="8" fill="#fff" opacity="0.8" />
          <ellipse cx="120" cy="70" rx="14" ry="7" fill="#fff" opacity="0.7" />
        </>
      )}
      {(kind === 'night' || kind === 'cosmos') &&
        [
          [30, 40],
          [70, 28],
          [110, 52],
          [150, 30],
          [50, 80],
          [170, 78],
        ].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" fill="#fff" />)}
      {kind === 'night' && <circle cx="150" cy="48" r="14" fill="#F7F3EA" />}
      {(kind === 'garden' || kind === 'meadow' || kind === 'temple' || kind === 'sky' || kind === 'dawn') && (
        <path d="M0 210 Q50 180 100 208 T200 200 V280 H0 Z" fill="#8FBF73" />
      )}
      {kind === 'ocean' && (
        <>
          <path d="M0 180 Q50 160 100 182 T200 170 V280 H0 Z" fill="#7EB6E0" />
          <path d="M0 210 Q40 190 100 214 T200 200 V280 H0 Z" fill="#4F93C4" />
        </>
      )}
      {kind === 'mountain' && <path d="M0 220 L40 140 L80 200 L120 120 L160 190 L200 150 V280 H0 Z" fill="#9EC4DE" />}
      {kind === 'temple' && <path d="M40 150 Q100 70 160 150 V230 H40 Z" fill="#F4E1B5" opacity="0.9" />}
      {kind === 'palace' && (
        <g>
          <rect x="30" y="120" width="140" height="90" fill="#F4E1B5" />
          <path d="M24 120 L100 60 L176 120 Z" fill="#C8482A" opacity="0.85" />
        </g>
      )}
      {kind === 'heart' && (
        <path d="M100 200 C40 150 50 80 100 110 C150 80 160 150 100 200 Z" fill="#F4A0B4" opacity="0.35" />
      )}
      {kind === 'lanka' && <path d="M50 150 L100 90 L150 150 V210 H50 Z" fill="#F4E1B5" />}
      <path d="M0 236 Q50 220 100 240 T200 230 V280 H0 Z" fill={kind === 'ocean' ? '#3E7EAE' : '#6E9A62'} opacity="0.95" />
    </g>
  )
}

export function StoryArt({ scene }: { scene: SceneSpec }) {
  const uid = useId().replace(/:/g, '')
  return (
    <svg className={`story-art tap-${scene.anim}`} viewBox="0 0 200 280" role="presentation">
      <defs>
        <clipPath id={uid}>
          <rect width="200" height="280" rx="28" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid})`}>
        <Backdrop kind={scene.bg} />
        {scene.items.map((item, index) => {
          const draw = DRAW[item.k]
          const flip = item.flip ? -1 : 1
          const scale = item.s ?? 1
          return (
            <g key={`${item.k}-${index}`} transform={`translate(${item.x} ${item.y})`}>
              <g className={item.main ? 'focus' : undefined}>
                <g transform={`scale(${scale * flip} ${scale})`}>{draw ? draw(item.pose) : <Star />}</g>
              </g>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
