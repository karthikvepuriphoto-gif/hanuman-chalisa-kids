import { useId, type ReactNode } from 'react'
import type { SceneSpec } from './scenes'

type ItemProps = { pose?: string }

/** One Hanuman. Poses move the same body; face, fur, crown, thread, and dhoti never change. */
function HanumanHead() {
  const curls = [
    [-22, -40],
    [-12, -48],
    [0, -50],
    [12, -48],
    [22, -40],
    [-28, -30],
    [28, -30],
    [-18, -34],
    [18, -34],
  ]
  return (
    <g>
      <ellipse cx="-24" cy="-14" rx="8" ry="10" fill="url(#hanu-skin)" />
      <ellipse cx="24" cy="-14" rx="8" ry="10" fill="url(#hanu-skin)" />
      <ellipse cx="-24" cy="-14" rx="4" ry="6" fill="#E39A62" />
      <ellipse cx="24" cy="-14" rx="4" ry="6" fill="#E39A62" />
      <ellipse cx="0" cy="-16" rx="16.5" ry="18" fill="url(#hanu-skin)" />
      <ellipse cx="-6" cy="-20" rx="6" ry="4" fill="#fff" opacity="0.28" />
      <ellipse cx="0" cy="-6" rx="9.2" ry="7.4" fill="#FBE3B8" />
      <ellipse cx="0" cy="-7" rx="5" ry="3" fill="#fff" opacity="0.35" />
      <ellipse cx="-3.1" cy="-8" rx="1.2" ry="1.7" fill="#C46A22" />
      <ellipse cx="3.1" cy="-8" rx="1.2" ry="1.7" fill="#C46A22" />
      <path d="M-5.2 -2.2 Q0 3.4 5.2 -2.2" fill="none" stroke="#8C3A2F" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="-7" cy="-18" rx="4.3" ry="4.7" fill="#fff" />
      <ellipse cx="7" cy="-18" rx="4.3" ry="4.7" fill="#fff" />
      <circle cx="-6.2" cy="-17.5" r="2.35" fill="#3A2418" />
      <circle cx="7.8" cy="-17.5" r="2.35" fill="#3A2418" />
      <circle cx="-5.4" cy="-18.4" r="0.85" fill="#fff" />
      <circle cx="8.6" cy="-18.4" r="0.85" fill="#fff" />
      <path d="M-11 -24 Q-7 -27 -3 -23.2" fill="none" stroke="#6B3418" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 -23.2 Q7 -27 11 -24" fill="none" stroke="#6B3418" strokeWidth="1.5" strokeLinecap="round" />
      {curls.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="6.2" fill="#6B3418" />
      ))}
      <path d="M-12 -30 L-7 -44 L0 -34 L7 -44 L12 -30 Z" fill="url(#gold)" stroke="#A87420" strokeWidth="0.8" />
      <circle cy="-40" r="2" fill="#C8482A" />
      <path d="M0 -28 l1.5 3.6 h-3 z" fill="#C8482A" />
      <circle cx="-22" cy="-4" r="4.4" fill="none" stroke="#F2C14E" strokeWidth="2.3" />
      <circle cx="22" cy="-4" r="4.4" fill="none" stroke="#F2C14E" strokeWidth="2.3" />
      <circle cx="-22" cy="1.2" r="2" fill="#E07A3D" />
      <circle cx="22" cy="1.2" r="2" fill="#E07A3D" />
    </g>
  )
}

function Gada({ raised = false, beside = false }: { raised?: boolean; beside?: boolean }) {
  const place = beside
    ? 'translate(40 4) rotate(14) scale(0.64)'
    : raised
      ? 'translate(28 -16) rotate(-18) scale(0.62)'
      : 'translate(30 16) rotate(24) scale(0.58)'
  return (
    <g transform={place}>
      <rect x="-4" y="-8" width="8" height="58" rx="3" fill="url(#gold)" />
      <circle cy="-20" r="16" fill="url(#gold)" />
      <ellipse cx="-4" cy="-26" rx="5" ry="3" fill="#fff" opacity="0.55" />
      <circle cy="-20" r="5" fill="#C8482A" />
    </g>
  )
}

function Hanuman({ pose = 'stand' }: ItemProps) {
  const fly = pose === 'fly'
  const bow = pose === 'bow'
  const sit = pose === 'sit'
  const namaste = pose === 'bow' || pose === 'glow'
  const raised = pose === 'hero' || pose === 'guard' || pose === 'big'
  const halo = pose === 'glow' || pose === 'hero' || pose === 'big'
  const tilt = fly ? -18 : bow ? 16 : 0
  const squat = sit ? 'translate(0 12) scale(1 0.84)' : bow ? 'translate(2 8)' : ''
  return (
    <g transform={`${squat} rotate(${tilt} 0 8)`}>
      {halo && <ellipse cx="0" cy="4" rx="48" ry="60" fill="url(#aura)" />}
      {fly && (
        <g stroke="#F2C14E" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85">
          <path d="M-50 4 H-30" />
          <path d="M-46 16 H-28" />
          <path d="M-42 -8 H-26" />
        </g>
      )}
      <ellipse cx="2" cy="56" rx="24" ry="5.5" fill="#5c3317" opacity="0.16" />
      <path
        d="M14 16 C42 24 54 -4 30 -34"
        fill="none"
        stroke="url(#hanu-skin)"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <circle cx="30" cy="-34" r="5" fill="#8C3A2F" />
      <path d="M-13 24 Q-18 50 -7 56 Q0 44 0 30 Q0 44 7 56 Q18 50 13 24 Z" fill="url(#dhoti-red)" />
      <path d="M-2 30 Q0 50 2 30" fill="#7A2E22" opacity="0.28" />
      <path d="M-14 52 Q0 58 14 52" fill="none" stroke="#F2C14E" strokeWidth="2.6" strokeLinecap="round" />
      <ellipse cx="0" cy="12" rx="16" ry="18" fill="url(#hanu-skin)" />
      <ellipse cx="-4" cy="6" rx="6" ry="8" fill="#fff" opacity="0.2" />
      <path d="M-16 18 Q0 30 16 18 L10 26 Q0 32 -10 26 Z" fill="url(#dhoti-red)" />
      <path d="M-15 19 Q0 26 15 19" fill="none" stroke="#F2C14E" strokeWidth="2" />
      <path d="M-11 -4 Q1 14 13 32" fill="none" stroke="#F8E7C0" strokeWidth="4.2" strokeLinecap="round" />
      <path d="M-9 -2 Q3 16 14 33" fill="none" stroke="#C8482A" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M-10 2 Q0 11 10 2" fill="none" stroke="#F2C14E" strokeWidth="2.3" />
      <circle cy="9" r="2.3" fill="#C8482A" stroke="#F2C14E" strokeWidth="0.8" />
      <ellipse cx="-15" cy="8" rx="4.2" ry="2.2" fill="none" stroke="#F2C14E" strokeWidth="1.6" />
      <ellipse cx="15" cy="6" rx="4.2" ry="2.2" fill="none" stroke="#F2C14E" strokeWidth="1.6" />
      {namaste ? (
        <>
          <path d="M-14 6 Q-6 20 -1 16" stroke="#A85A20" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M14 6 Q6 20 1 16" stroke="#A85A20" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M-14 6 Q-6 20 -1 16" stroke="url(#hanu-skin)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M14 6 Q6 20 1 16" stroke="url(#hanu-skin)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="0" cy="17" rx="4.2" ry="5" fill="#F6C56A" />
          <Gada beside />
        </>
      ) : (
        <>
          <path d="M-14 6 Q-26 16 -22 30" stroke="#A85A20" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M-14 6 Q-26 16 -22 30" stroke="url(#hanu-skin)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx="-22" cy="32" r="3.6" fill="#F0A23A" />
          <path
            d={raised || fly ? 'M14 4 Q28 -2 26 -8' : 'M14 6 Q28 16 24 26'}
            stroke="#A85A20"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={raised || fly ? 'M14 4 Q28 -2 26 -8' : 'M14 6 Q28 16 24 26'}
            stroke="url(#hanu-skin)"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />
          <Gada raised={raised || fly} />
        </>
      )}
      <HanumanHead />
    </g>
  )
}

function HumanFace({
  skin,
  hair = '#3A2418',
  crown = true,
  longHair = false,
  veil = false,
  beard = false,
  bun = false,
  crescent = false,
  child = false,
}: {
  skin: string
  hair?: string
  crown?: boolean
  longHair?: boolean
  veil?: boolean
  beard?: boolean
  bun?: boolean
  crescent?: boolean
  child?: boolean
}) {
  const y = child ? -18 : -16
  const r = child ? 14.5 : 13.5
  return (
    <g>
      {longHair && (
        <>
          <path d="M-12 -30 Q-26 4 -12 26" stroke={hair} strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M12 -30 Q26 4 12 26" stroke={hair} strokeWidth="7" fill="none" strokeLinecap="round" />
        </>
      )}
      {veil && <path d="M-16 -24 Q0 -40 16 -24 L14 8 Q0 16 -14 8 Z" fill="#F7F3EA" opacity="0.92" />}
      {bun && <circle cx="0" cy={y - 16} r="6" fill={hair} />}
      <circle cx="0" cy={y} r={r} fill={skin} />
      <ellipse cx="-4" cy={y - 5} rx="5" ry="3.2" fill="#fff" opacity="0.3" />
      <ellipse cx="-5.2" cy={y - 1} rx="3.5" ry="3.8" fill="#fff" />
      <ellipse cx="5.2" cy={y - 1} rx="3.5" ry="3.8" fill="#fff" />
      <circle cx="-4.5" cy={y - 0.4} r="1.85" fill="#3A2418" />
      <circle cx="5.9" cy={y - 0.4} r="1.85" fill="#3A2418" />
      <circle cx="-3.9" cy={y - 1.2} r="0.7" fill="#fff" />
      <circle cx="6.5" cy={y - 1.2} r="0.7" fill="#fff" />
      <path d={`M-4 ${y + 6} Q0 ${y + 10} 4 ${y + 6}`} fill="none" stroke="#8C3A2F" strokeWidth="1.5" strokeLinecap="round" />
      {beard && <path d={`M-8 ${y + 4} Q0 ${y + 16} 8 ${y + 4}`} fill="#F7F1E6" />}
      {crown && (
        <path
          d={`M-11 ${y - 10} L-7 ${y - 24} L0 ${y - 14} L7 ${y - 24} L11 ${y - 10} Z`}
          fill="url(#gold)"
          stroke="#A87420"
          strokeWidth="0.7"
        />
      )}
      {crescent && <path d={`M8 ${y - 20} a5 5 0 1 0 .2 0`} fill="#F2C14E" />}
      <path d={`M0 ${y - 11} l1.3 3.2 h-2.6 z`} fill="#C8482A" />
    </g>
  )
}

function Rama() {
  return (
    <g>
      <ellipse cx="0" cy="56" rx="22" ry="5" fill="#5c3317" opacity="0.14" />
      <path d="M-12 22 Q-16 50 -6 56 Q0 44 0 30 Q0 44 6 56 Q16 50 12 22 Z" fill="url(#dhoti-gold)" />
      <path d="M-12 50 Q0 56 12 50" fill="none" stroke="#C8482A" strokeWidth="2.2" />
      <ellipse cx="0" cy="14" rx="15" ry="17" fill="url(#rama-skin)" />
      <ellipse cx="-3" cy="8" rx="5" ry="7" fill="#fff" opacity="0.22" />
      <path d="M-9 0 Q2 18 11 30" fill="none" stroke="#F8E7C0" strokeWidth="2.2" />
      <path d="M-9 4 Q0 12 9 4" fill="none" stroke="#F2C14E" strokeWidth="2" />
      <path d="M-14 8 Q-24 18 -18 30" stroke="#6AA0D0" strokeWidth="6.5" fill="none" strokeLinecap="round" />
      <g transform="translate(-24 18) scale(0.7)">
        <path d="M-6 -28 Q26 0 -6 28" fill="none" stroke="#C48A2A" strokeWidth="3.5" />
        <path d="M-6 -28 L-6 28" stroke="#5C3317" strokeWidth="1.6" />
      </g>
      <path d="M14 6 Q22 16 16 26" stroke="#6AA0D0" strokeWidth="6.5" fill="none" strokeLinecap="round" />
      <HumanFace skin="url(#rama-skin)" crown />
    </g>
  )
}

function Sita() {
  return (
    <g>
      <ellipse cx="0" cy="56" rx="22" ry="5" fill="#5c3317" opacity="0.14" />
      <path d="M-18 18 Q-8 58 0 58 Q8 58 18 18 Q6 34 -6 28 Z" fill="url(#sari)" />
      <path d="M-16 24 Q0 36 16 22" fill="none" stroke="#F2C14E" strokeWidth="2.2" />
      <path d="M-8 40 Q0 48 10 36" fill="none" stroke="#F2C14E" strokeWidth="1.8" />
      <ellipse cx="0" cy="12" rx="14" ry="16" fill="url(#sita-skin)" />
      <path d="M-12 4 Q0 16 14 2 L12 14 Q0 20 -10 12 Z" fill="#F4A0B8" opacity="0.95" />
      <path d="M-10 6 Q0 12 10 5" fill="none" stroke="#F2C14E" strokeWidth="1.7" />
      <HumanFace skin="url(#sita-skin)" longHair veil crown />
    </g>
  )
}

function Lakshman() {
  return (
    <g>
      <ellipse cx="0" cy="56" rx="22" ry="5" fill="#5c3317" opacity="0.14" />
      <path d="M-12 22 Q-16 50 -6 56 Q0 44 0 30 Q0 44 6 56 Q16 50 12 22 Z" fill="url(#dhoti-saffron)" />
      <path d="M-12 50 Q0 56 12 50" fill="none" stroke="#F2C14E" strokeWidth="2.2" />
      <ellipse cx="0" cy="14" rx="15" ry="17" fill="url(#laksh-skin)" />
      <ellipse cx="-3" cy="8" rx="5" ry="7" fill="#fff" opacity="0.2" />
      <path d="M-9 0 Q2 18 11 30" fill="none" stroke="#F8E7C0" strokeWidth="2.2" />
      <path d="M-9 4 Q0 12 9 4" fill="none" stroke="#F2C14E" strokeWidth="2" />
      <path d="M-14 8 Q-24 18 -18 30" stroke="#7EB8C8" strokeWidth="6.5" fill="none" strokeLinecap="round" />
      <g transform="translate(-24 18) scale(0.7)">
        <path d="M-6 -28 Q26 0 -6 28" fill="none" stroke="#C48A2A" strokeWidth="3.5" />
        <path d="M-6 -28 L-6 28" stroke="#5C3317" strokeWidth="1.6" />
      </g>
      <path d="M14 6 Q22 16 16 26" stroke="#7EB8C8" strokeWidth="6.5" fill="none" strokeLinecap="round" />
      <HumanFace skin="url(#laksh-skin)" crown />
    </g>
  )
}

function Person({
  skin = 'url(#warm-skin)',
  cloth = '#E07A3D',
  accent = '#F2C14E',
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
  crown?: boolean
  bun?: boolean
  beard?: boolean
  longHair?: boolean
  aura?: boolean
  crescent?: boolean
  child?: boolean
}) {
  return (
    <g>
      {aura && <ellipse cx="0" cy="6" rx="46" ry="58" fill="url(#aura)" />}
      <ellipse cx="0" cy="56" rx="22" ry="5" fill="#5c3317" opacity="0.14" />
      <path d="M-13 24 Q-16 52 -6 56 Q0 44 0 32 Q0 44 6 56 Q16 52 13 24 Z" fill={cloth} />
      <ellipse cx="0" cy="16" rx="16" ry="18" fill={cloth} />
      <ellipse cx="0" cy="10" rx="11" ry="8" fill={accent} />
      <ellipse cx="-4" cy="12" rx="5" ry="6" fill="#fff" opacity="0.18" />
      <HumanFace skin={skin} crown={crown} bun={bun} beard={beard} longHair={longHair} crescent={crescent} child={child} />
    </g>
  )
}

function ChildFig() {
  return <Person skin="url(#warm-skin)" cloth="#7EB6E0" accent="#F8E2A0" child />
}
function Shiva() {
  return <Person skin="url(#shiva-skin)" cloth="#F4A261" accent="#F2C14E" bun crescent aura />
}
function Sage() {
  return <Person skin="url(#warm-skin)" cloth="#F4E1B5" accent="#E07A3D" bun beard />
}
function Sugriva() {
  return (
    <g>
      <ellipse cx="0" cy="56" rx="22" ry="5" fill="#5c3317" opacity="0.14" />
      <path d="M12 20 C36 26 40 -2 24 -20" fill="none" stroke="#C4843A" strokeWidth="7" strokeLinecap="round" />
      <path d="M-12 24 Q-16 52 -6 56 Q0 44 0 32 Q0 44 6 56 Q16 52 12 24 Z" fill="#6E9A62" />
      <ellipse cx="0" cy="16" rx="15" ry="16" fill="#E0A15A" />
      <ellipse cx="-20" cy="-12" rx="7" ry="8" fill="#E0A15A" />
      <ellipse cx="20" cy="-12" rx="7" ry="8" fill="#E0A15A" />
      <ellipse cx="0" cy="-14" rx="14" ry="15" fill="#E0A15A" />
      <ellipse cx="0" cy="-6" rx="7" ry="5.5" fill="#F3D2A4" />
      <ellipse cx="-6" cy="-16" rx="3.2" ry="3.4" fill="#fff" />
      <ellipse cx="6" cy="-16" rx="3.2" ry="3.4" fill="#fff" />
      <circle cx="-5.4" cy="-15.6" r="1.6" fill="#3A2418" />
      <circle cx="6.6" cy="-15.6" r="1.6" fill="#3A2418" />
      <path d="M-4 -3 Q0 1 4 -3" fill="none" stroke="#8C3A2F" strokeWidth="1.3" />
      <path d="M-10 -26 L0 -18 L10 -26 L6 -30 L0 -24 L-6 -30 Z" fill="#6E9A62" stroke="#F2C14E" strokeWidth="1" />
    </g>
  )
}
function Vibhishan() {
  return <Person skin="url(#warm-skin)" cloth="#5FA8A0" accent="#F2C14E" crown />
}
function Tulsidas() {
  return <Person skin="url(#warm-skin)" cloth="#F4E1B5" accent="#C8482A" bun beard />
}
function Anjani() {
  return <Person skin="url(#sita-skin)" cloth="#A8434A" accent="#F2C14E" longHair />
}
function Narad() {
  return <Person skin="url(#warm-skin)" cloth="#F2C14E" accent="#C8482A" bun beard />
}
function Saraswati() {
  return <Person skin="url(#warm-skin)" cloth="#F7F3EA" accent="#F2C14E" longHair crown />
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
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1="-36"
          x2="0"
          y2="-50"
          stroke="url(#gold)"
          strokeWidth="5"
          strokeLinecap="round"
          transform={`rotate(${i * 30})`}
        />
      ))}
      <circle r="30" fill="url(#gold)" />
      <ellipse cx="-8" cy="-10" rx="10" ry="6" fill="#fff" opacity="0.45" />
      {fruit && (
        <>
          <path d="M2 -28 Q14 -46 4 -26" stroke="#3E7A45" strokeWidth="3" fill="#6E9A62" />
          <ellipse cx="10" cy="-36" rx="8" ry="4" fill="#8FBF73" />
        </>
      )}
    </g>
  )
}

function Mountain() {
  return (
    <g>
      <path d="M-74 42 L-22 -46 L8 8 L32 -28 L74 42 Z" fill="url(#peak)" />
      <path d="M-22 -46 L-6 -12 L8 8 L-34 6 Z" fill="#fff" opacity="0.9" />
      <path d="M-40 42 L-8 8 L18 42 Z" fill="#7EAA6A" />
      <circle cx="-16" cy="16" r="4" fill="#3E7A45" />
      <circle cx="2" cy="22" r="3.2" fill="#F7F3EA" />
      <circle cx="16" cy="14" r="3.4" fill="#8FBF73" />
      <circle cx="-4" cy="30" r="2.4" fill="#E07A3D" />
      <ellipse cx="0" cy="40" rx="28" ry="5" fill="#5c3317" opacity="0.12" />
    </g>
  )
}

function Heart() {
  return (
    <g>
      <path d="M0 20 C-30 2 -20 -24 0 -8 C20 -24 30 2 0 20 Z" fill="url(#heart)" />
      <ellipse cx="-8" cy="-4" rx="6" ry="4" fill="#fff" opacity="0.35" />
    </g>
  )
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
      <rect x="-5" y="-6" width="10" height="64" rx="4" fill="url(#gold)" />
      <circle cy="-22" r="20" fill="url(#gold)" />
      <ellipse cx="-6" cy="-30" rx="6" ry="3.5" fill="#fff" opacity="0.5" />
      <circle cy="-22" r="6" fill="#C8482A" />
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
          d={`M${x} 22 C${x - 16} 18 ${x - 14} -6 ${x} -30 C${x + 14} -6 ${x + 16} 18 ${x} 22 Z`}
          fill={i === 1 ? 'url(#gold)' : '#E07A3D'}
        />
      ))}
      <ellipse cx="0" cy="20" rx="34" ry="6" fill="#C8482A" opacity="0.25" />
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
    kind === 'night' ? 'url(#sky-night)' : kind === 'cosmos' ? 'url(#sky-cosmos)' : kind === 'lanka' ? 'url(#sky-lanka)' : kind === 'dawn' ? 'url(#sky-dawn)' : kind === 'ocean' ? 'url(#sky-ocean)' : 'url(#sky-day)'
  return (
    <g>
      <rect width="200" height="280" fill={sky} />
      {kind !== 'night' && kind !== 'cosmos' && (
        <>
          <circle cx="162" cy="46" r="26" fill="#F2C14E" opacity="0.28" />
          <circle cx="162" cy="46" r="16" fill="url(#gold)" />
          <ellipse cx="156" cy="40" rx="5" ry="3" fill="#fff" opacity="0.55" />
          <ellipse cx="36" cy="52" rx="22" ry="10" fill="#fff" opacity="0.82" />
          <ellipse cx="52" cy="48" rx="14" ry="9" fill="#fff" />
          <ellipse cx="118" cy="74" rx="16" ry="8" fill="#fff" opacity="0.75" />
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
      {kind === 'night' && (
        <>
          <circle cx="150" cy="48" r="16" fill="#F7F3EA" />
          <circle cx="144" cy="44" r="12" fill="#2E4A7A" opacity="0.18" />
        </>
      )}
      {(kind === 'garden' || kind === 'meadow' || kind === 'temple' || kind === 'sky' || kind === 'dawn') && (
        <path d="M0 198 Q48 168 100 196 T200 186 V250 H0 Z" fill="#A9D18E" />
      )}
      {kind === 'ocean' && (
        <>
          <path d="M0 168 Q50 148 100 170 T200 156 V250 H0 Z" fill="#8ECAE6" />
          <path d="M0 196 Q46 176 100 202 T200 188 V260 H0 Z" fill="#4F93C4" />
          <path d="M20 188 Q40 180 60 190" fill="none" stroke="#fff" strokeWidth="3" opacity="0.45" strokeLinecap="round" />
          <path d="M110 176 Q132 168 150 178" fill="none" stroke="#fff" strokeWidth="3" opacity="0.4" strokeLinecap="round" />
        </>
      )}
      {kind === 'mountain' && (
        <>
          <path d="M0 210 L36 132 L78 188 L118 108 L168 176 L200 140 V250 H0 Z" fill="url(#peak)" />
          <path d="M118 108 L104 150 L136 146 Z" fill="#fff" opacity="0.85" />
        </>
      )}
      {kind === 'temple' && (
        <g>
          <path d="M46 168 Q100 62 154 168 V228 H46 Z" fill="#F4E1B5" />
          <path d="M70 168 Q100 96 130 168" fill="#E7C98A" />
          <rect x="92" y="150" width="16" height="78" rx="3" fill="#C8482A" />
          <rect x="58" y="176" width="10" height="52" fill="#E7C98A" />
          <rect x="132" y="176" width="10" height="52" fill="#E7C98A" />
        </g>
      )}
      {kind === 'palace' && (
        <g>
          <rect x="28" y="118" width="144" height="100" fill="#F4E1B5" />
          <rect x="28" y="118" width="18" height="100" fill="#E7C98A" />
          <path d="M22 118 L100 52 L178 118 Z" fill="#C8482A" />
          <circle cx="100" cy="78" r="7" fill="url(#gold)" />
          <rect x="88" y="150" width="24" height="68" rx="4" fill="#8C3A2F" />
        </g>
      )}
      {kind === 'heart' && (
        <path d="M100 210 C36 156 48 78 100 112 C152 78 164 156 100 210 Z" fill="#F4A0B4" opacity="0.38" />
      )}
      {kind === 'lanka' && (
        <g>
          <path d="M48 156 L100 86 L152 156 V214 H48 Z" fill="#F4E1B5" />
          <path d="M48 156 L100 86 L118 156 Z" fill="#E7C98A" />
          <path d="M70 150 C66 132 78 124 82 140 C86 122 98 132 90 150 Z" fill="#E07A3D" opacity="0.85" />
          <path d="M112 146 C108 126 122 118 126 138 C130 120 142 132 132 148 Z" fill="#F2C14E" opacity="0.8" />
        </g>
      )}
      <path d="M0 228 Q50 210 100 232 T200 220 V280 H0 Z" fill={kind === 'ocean' ? '#3E7EAE' : 'url(#ground)'} />
      <path d="M0 252 Q60 240 120 256 T200 246 V280 H0 Z" fill={kind === 'ocean' ? '#2F6A96' : '#5E8A52'} opacity="0.55" />
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
        <radialGradient id="hanu-skin" cx="32%" cy="28%" r="75%">
          <stop offset="0" stopColor="#FFE7A8" />
          <stop offset="0.45" stopColor="#F0A23A" />
          <stop offset="1" stopColor="#C46A22" />
        </radialGradient>
        <radialGradient id="rama-skin" cx="32%" cy="28%" r="78%">
          <stop offset="0" stopColor="#D6ECFF" />
          <stop offset="0.5" stopColor="#5B93C9" />
          <stop offset="1" stopColor="#2E628F" />
        </radialGradient>
        <radialGradient id="laksh-skin" cx="32%" cy="28%" r="78%">
          <stop offset="0" stopColor="#E5F6FA" />
          <stop offset="0.55" stopColor="#7EB4C6" />
          <stop offset="1" stopColor="#3E7C90" />
        </radialGradient>
        <radialGradient id="sita-skin" cx="32%" cy="30%" r="75%">
          <stop offset="0" stopColor="#FFF0DE" />
          <stop offset="0.6" stopColor="#F0C29A" />
          <stop offset="1" stopColor="#D39A72" />
        </radialGradient>
        <radialGradient id="warm-skin" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#FFF1E0" />
          <stop offset="1" stopColor="#E7B48A" />
        </radialGradient>
        <radialGradient id="shiva-skin" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#D5E2EA" />
        </radialGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF6C8" />
          <stop offset="0.45" stopColor="#F2C14E" />
          <stop offset="1" stopColor="#C48A2A" />
        </linearGradient>
        <linearGradient id="dhoti-red" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E36A48" />
          <stop offset="1" stopColor="#8C3A2F" />
        </linearGradient>
        <linearGradient id="dhoti-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE9A0" />
          <stop offset="1" stopColor="#E0A83A" />
        </linearGradient>
        <linearGradient id="dhoti-saffron" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6C27A" />
          <stop offset="1" stopColor="#E07A3D" />
        </linearGradient>
        <linearGradient id="sari" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7C2D0" />
          <stop offset="1" stopColor="#C45B78" />
        </linearGradient>
        <radialGradient id="aura" cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="#FFE08A" stopOpacity="0.85" />
          <stop offset="1" stopColor="#FFE08A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="heart" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F08A6A" />
          <stop offset="1" stopColor="#C8482A" />
        </linearGradient>
        <linearGradient id="peak" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7FBFF" />
          <stop offset="0.35" stopColor="#9EC4DE" />
          <stop offset="1" stopColor="#6E9A62" />
        </linearGradient>
        <linearGradient id="sky-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE7C2" />
          <stop offset="0.55" stopColor="#F8D7A8" />
          <stop offset="1" stopColor="#8ECAE6" />
        </linearGradient>
        <linearGradient id="sky-dawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6B17A" />
          <stop offset="1" stopColor="#8ECAE6" />
        </linearGradient>
        <linearGradient id="sky-lanka" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6B17A" />
          <stop offset="0.6" stopColor="#E07A3D" />
          <stop offset="1" stopColor="#8ECAE6" />
        </linearGradient>
        <linearGradient id="sky-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1E3358" />
          <stop offset="1" stopColor="#6E4A2A" />
        </linearGradient>
        <linearGradient id="sky-cosmos" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#415E92" />
          <stop offset="1" stopColor="#F8E2A0" />
        </linearGradient>
        <linearGradient id="sky-ocean" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F8D7A8" />
          <stop offset="1" stopColor="#7EB6E0" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8FBF73" />
          <stop offset="1" stopColor="#5E8A52" />
        </linearGradient>
        <filter id="soft" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.2" floodColor="#5c3317" floodOpacity="0.28" />
        </filter>
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
                <g filter="url(#soft)" transform={`scale(${scale * flip} ${scale})`}>
                  {draw ? draw(item.pose) : <Star />}
                </g>
              </g>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
