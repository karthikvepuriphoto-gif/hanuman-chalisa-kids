export type Anim = 'float' | 'glow' | 'bounce' | 'sparkle' | 'sway' | 'pop' | 'rise' | 'heartbeat'

export type Item = {
  k: string
  x: number
  y: number
  s?: number
  pose?: string
  flip?: boolean
  main?: boolean
}

export type SceneSpec = {
  bg: 'sky' | 'dawn' | 'night' | 'ocean' | 'garden' | 'temple' | 'palace' | 'mountain' | 'heart' | 'lanka' | 'cosmos' | 'meadow'
  anim: Anim
  items: Item[]
}

function scene(bg: SceneSpec['bg'], anim: Anim, items: Item[]): SceneSpec {
  return { bg, anim, items }
}

function item(k: string, x: number, y: number, s = 1, extra?: Partial<Item>): Item {
  return { k, x, y, s, ...extra }
}

/** Two meaning-first pictures for every piece, left then right. */
export const storyboard: Record<string, [SceneSpec, SceneSpec]> = {
  'doha-1': [
    scene('temple', 'glow', [
      item('lotus', 62, 176, 0.95, { main: true }),
      item('mirror', 138, 168, 0.9, { main: true }),
      item('dust', 100, 110, 1),
    ]),
    scene('meadow', 'float', [item('fruits', 100, 156, 1, { main: true })]),
  ],
  'doha-2': [
    scene('sky', 'bounce', [
      item('child', 58, 176, 0.82),
      item('hanuman', 136, 168, 0.95, { pose: 'glow', main: true }),
    ]),
    scene('dawn', 'sparkle', [
      item('mace', 46, 160, 0.7),
      item('book', 100, 168, 0.95, { main: true }),
      item('star', 156, 150, 0.7, { main: true }),
    ]),
  ],
  'chaupai-1': [
    scene('cosmos', 'glow', [
      item('hanuman', 100, 176, 0.95, { pose: 'glow', main: true }),
      item('dust', 100, 100, 1.1),
    ]),
    scene('night', 'sparkle', [
      item('hanuman', 70, 180, 0.85, { pose: 'hero', main: true }),
      item('worlds', 142, 150, 0.75, { main: true }),
    ]),
  ],
  'chaupai-2': [
    scene('sky', 'float', [
      item('hanuman', 78, 176, 0.9, { pose: 'fly', main: true }),
      item('letter', 148, 160, 1, { main: true }),
    ]),
    scene('dawn', 'sway', [
      item('wind', 46, 140, 0.8),
      item('anjani', 78, 180, 0.8),
      item('baby', 150, 190, 0.9, { main: true }),
    ]),
  ],
  'chaupai-3': [
    scene('meadow', 'pop', [item('hanuman', 100, 170, 1.15, { pose: 'hero', main: true })]),
    scene('sky', 'float', [
      item('cloud', 52, 130, 0.9, { main: true }),
      item('friends', 140, 180, 0.85, { main: true }),
    ]),
  ],
  'chaupai-4': [
    scene('dawn', 'glow', [item('hanuman', 100, 172, 1.1, { pose: 'glow', main: true })]),
    scene('palace', 'sparkle', [
      item('earrings', 70, 150, 1.1, { main: true }),
      item('curls', 140, 160, 1, { main: true }),
    ]),
  ],
  'chaupai-5': [
    scene('sky', 'pop', [
      item('mace', 62, 160, 0.95, { main: true }),
      item('flag', 140, 150, 0.85, { main: true }),
    ]),
    scene('temple', 'sway', [
      item('hanuman', 78, 176, 0.9),
      item('thread', 142, 160, 1, { main: true }),
    ]),
  ],
  'chaupai-6': [
    scene('dawn', 'glow', [
      item('shiva', 62, 172, 0.82),
      item('hanuman', 140, 176, 0.9, { main: true }),
    ]),
    scene('meadow', 'sway', [
      item('bowing', 70, 180, 1, { main: true }),
      item('hanuman', 150, 168, 0.85, { pose: 'hero' }),
    ]),
  ],
  'chaupai-7': [
    scene('garden', 'sparkle', [
      item('book', 60, 168, 1, { main: true }),
      item('hanuman', 140, 174, 0.9, { pose: 'glow' }),
    ]),
    scene('palace', 'bounce', [
      item('hanuman', 64, 176, 0.85, { pose: 'fly', main: true }),
      item('rama', 142, 172, 0.82),
    ]),
  ],
  'chaupai-8': [
    scene('garden', 'sway', [
      item('hanuman', 68, 176, 0.9),
      item('notes', 140, 150, 0.9, { main: true }),
      item('book', 140, 200, 0.6),
    ]),
    scene('heart', 'heartbeat', [
      item('heart', 100, 150, 1.3, { main: true }),
      item('rama', 70, 188, 0.42),
      item('sita', 100, 182, 0.42),
      item('lakshman', 132, 188, 0.42),
    ]),
  ],
  'chaupai-9': [
    scene('palace', 'pop', [
      item('sita', 120, 176, 0.9),
      item('hanuman', 62, 196, 0.45, { pose: 'bow', main: true }),
    ]),
    scene('lanka', 'rise', [
      item('hanuman', 68, 168, 1.15, { pose: 'big', main: true }),
      item('palace', 150, 176, 0.7),
      item('flames', 150, 140, 0.7, { main: true }),
    ]),
  ],
  'chaupai-10': [
    scene('dawn', 'pop', [
      item('hanuman', 70, 168, 1.05, { pose: 'hero', main: true }),
      item('blob', 150, 180, 0.85, { main: true }),
      item('blob', 168, 150, 0.55, { flip: true }),
    ]),
    scene('palace', 'glow', [
      item('rama', 128, 172, 0.85),
      item('hanuman', 64, 180, 0.8, { pose: 'bow', main: true }),
      item('star', 150, 120, 0.55),
    ]),
  ],
  'chaupai-11': [
    scene('mountain', 'rise', [
      item('mountain', 100, 150, 1.05, { main: true }),
      item('hanuman', 100, 196, 0.55, { pose: 'fly' }),
    ]),
    scene('garden', 'bounce', [
      item('rama', 78, 174, 0.85),
      item('hanuman', 132, 178, 0.85, { pose: 'glow', main: true }),
      item('lakshman', 168, 188, 0.5),
    ]),
  ],
  'chaupai-12': [
    scene('palace', 'glow', [
      item('rama', 68, 172, 0.9),
      item('hanuman', 138, 180, 0.85, { pose: 'bow', main: true }),
    ]),
    scene('meadow', 'heartbeat', [
      item('rama', 68, 174, 0.85, { main: true }),
      item('hanuman', 136, 176, 0.85, { main: true }),
    ]),
  ],
  'chaupai-13': [
    scene('sky', 'float', [
      item('singers', 70, 170, 1, { main: true }),
      item('notes', 148, 150, 0.9, { main: true }),
    ]),
    scene('dawn', 'bounce', [
      item('rama', 72, 174, 0.88),
      item('hanuman', 134, 176, 0.88, { main: true }),
    ]),
  ],
  'chaupai-14': [
    scene('temple', 'glow', [
      item('sage', 48, 180, 0.7),
      item('shiva', 100, 168, 0.75, { main: true }),
      item('narad', 156, 180, 0.65),
    ]),
    scene('garden', 'sway', [
      item('saraswati', 64, 172, 0.85, { main: true }),
      item('veena', 130, 180, 0.9),
      item('narad', 156, 186, 0.55),
    ]),
  ],
  'chaupai-15': [
    scene('cosmos', 'sway', [
      item('sage', 50, 184, 0.65),
      item('singers', 130, 170, 0.85, { main: true }),
      item('notes', 100, 120, 0.7),
    ]),
    scene('night', 'sparkle', [
      item('star', 100, 140, 1.2, { main: true }),
      item('dust', 100, 190, 1),
    ]),
  ],
  'chaupai-16': [
    scene('garden', 'bounce', [
      item('sugriva', 48, 178, 0.75),
      item('hanuman', 104, 174, 0.8, { main: true }),
      item('rama', 158, 172, 0.75),
    ]),
    scene('palace', 'pop', [
      item('sugriva', 100, 176, 0.9, { main: true }),
      item('star', 100, 108, 0.7),
    ]),
  ],
  'chaupai-17': [
    scene('lanka', 'sway', [
      item('hanuman', 62, 176, 0.85),
      item('vibhishan', 140, 174, 0.85, { main: true }),
    ]),
    scene('palace', 'pop', [
      item('vibhishan', 100, 172, 1, { main: true }),
      item('palace', 100, 112, 0.55),
    ]),
  ],
  'chaupai-18': [
    scene('sky', 'float', [
      item('hanuman', 70, 180, 0.7, { pose: 'fly', main: true }),
      item('sunfruit', 148, 90, 0.7, { main: true }),
    ]),
    scene('dawn', 'glow', [item('sunfruit', 100, 140, 1.15, { main: true })]),
  ],
  'chaupai-19': [
    scene('palace', 'sparkle', [
      item('hanuman', 78, 176, 0.9),
      item('ring', 142, 150, 1.2, { main: true }),
    ]),
    scene('ocean', 'rise', [
      item('hanuman', 100, 150, 0.9, { pose: 'fly', main: true }),
      item('wind', 40, 120, 0.7),
    ]),
  ],
  'chaupai-20': [
    scene('mountain', 'pop', [
      item('path', 100, 170, 1.1, { main: true }),
      item('child', 100, 200, 0.55),
    ]),
    scene('dawn', 'glow', [
      item('child', 70, 182, 0.8),
      item('hanuman', 140, 168, 0.9, { pose: 'glow', main: true }),
    ]),
  ],
  'chaupai-21': [
    scene('palace', 'pop', [item('hanuman', 100, 172, 1.05, { pose: 'guard', main: true })]),
    scene('temple', 'glow', [
      item('gate', 100, 168, 1.05, { main: true }),
      item('rama', 100, 150, 0.4),
    ]),
  ],
  'chaupai-22': [
    scene('meadow', 'heartbeat', [
      item('hanuman', 100, 168, 1.05, { pose: 'glow', main: true }),
      item('child', 64, 196, 0.55),
    ]),
    scene('sky', 'float', [
      item('cloud', 70, 140, 1, { main: true }),
      item('sun', 145, 120, 0.55, { main: true }),
      item('child', 100, 190, 0.7),
    ]),
  ],
  'chaupai-23': [
    scene('cosmos', 'glow', [
      item('hanuman', 100, 176, 1, { pose: 'glow', main: true }),
      item('star', 100, 100, 0.6),
    ]),
    scene('night', 'sway', [item('worlds', 100, 150, 1.15, { main: true })]),
  ],
  'chaupai-24': [
    scene('dawn', 'float', [
      item('blob', 46, 170, 0.8, { main: true }),
      item('blob', 78, 150, 0.55, { flip: true }),
      item('hanuman', 148, 172, 0.9, { pose: 'hero' }),
    ]),
    scene('sky', 'glow', [item('shield', 100, 150, 1.25, { main: true })]),
  ],
  'chaupai-25': [
    scene('dawn', 'glow', [
      item('child', 78, 180, 0.85),
      item('diya', 140, 160, 1.2, { main: true }),
    ]),
    scene('garden', 'heartbeat', [
      item('child', 78, 180, 0.85, { main: true }),
      item('notes', 142, 150, 0.85),
    ]),
  ],
  'chaupai-26': [
    scene('meadow', 'pop', [
      item('ribbon', 100, 150, 1.15, { main: true }),
      item('child', 100, 200, 0.55),
    ]),
    scene('sky', 'glow', [
      item('star', 100, 110, 0.7, { main: true }),
      item('child', 100, 190, 0.75),
      item('notes', 150, 170, 0.6),
    ]),
  ],
  'chaupai-27': [
    scene('temple', 'glow', [item('rama', 100, 168, 1.05, { main: true })]),
    scene('palace', 'bounce', [
      item('hanuman', 78, 176, 0.9, { main: true }),
      item('baskets', 145, 170, 0.85),
    ]),
  ],
  'chaupai-28': [
    scene('night', 'sparkle', [
      item('star', 60, 120, 0.7, { main: true }),
      item('star', 110, 150, 0.55),
      item('child', 140, 190, 0.7),
    ]),
    scene('meadow', 'float', [item('fruits', 100, 156, 1.05, { main: true })]),
  ],
  'chaupai-29': [
    scene('sky', 'sparkle', [item('seasons', 100, 150, 1.15, { main: true })]),
    scene('dawn', 'glow', [
      item('sun', 100, 110, 0.8, { main: true }),
      item('worlds', 100, 190, 0.7),
    ]),
  ],
  'chaupai-30': [
    scene('garden', 'heartbeat', [
      item('hanuman', 120, 168, 1, { pose: 'guard', main: true }),
      item('child', 52, 190, 0.65),
      item('sage', 78, 200, 0.45),
    ]),
    scene('palace', 'bounce', [
      item('rama', 78, 172, 0.85),
      item('hanuman', 138, 176, 0.9, { main: true }),
    ]),
  ],
  'chaupai-31': [
    scene('palace', 'glow', [
      item('sita', 78, 170, 0.95, { main: true }),
      item('hanuman', 146, 184, 0.75, { pose: 'bow' }),
    ]),
    scene('dawn', 'sparkle', [
      item('gems', 100, 150, 1.15, { main: true }),
      item('star', 100, 90, 0.5),
    ]),
  ],
  'chaupai-32': [
    scene('temple', 'glow', [item('jar', 100, 156, 1.3, { main: true })]),
    scene('palace', 'heartbeat', [
      item('hanuman', 78, 180, 0.85, { pose: 'bow', main: true }),
      item('rama', 140, 170, 0.9),
    ]),
  ],
  'chaupai-33': [
    scene('garden', 'sway', [
      item('singers', 78, 172, 1, { main: true }),
      item('notes', 150, 140, 0.9),
    ]),
    scene('sky', 'float', [
      item('cloud', 70, 140, 0.9, { main: true }),
      item('child', 140, 186, 0.8),
      item('sun', 150, 100, 0.4),
    ]),
  ],
  'chaupai-34': [
    scene('dawn', 'rise', [
      item('path', 100, 180, 1),
      item('child', 70, 168, 0.7, { main: true }),
    ]),
    scene('night', 'glow', [item('city', 100, 160, 1.15, { main: true })]),
  ],
  'chaupai-35': [
    scene('heart', 'heartbeat', [
      item('heart', 78, 150, 1.1, { main: true }),
      item('hanuman', 142, 176, 0.85, { pose: 'glow' }),
    ]),
    scene('meadow', 'bounce', [item('child', 100, 176, 1.05, { main: true })]),
  ],
  'chaupai-36': [
    scene('sky', 'pop', [
      item('rope', 100, 150, 1.2, { main: true }),
      item('sun', 150, 100, 0.4),
    ]),
    scene('dawn', 'glow', [
      item('child', 70, 182, 0.85),
      item('hanuman', 140, 168, 0.95, { pose: 'hero', main: true }),
    ]),
  ],
  'chaupai-37': [
    scene('sky', 'bounce', [
      item('star', 50, 130, 0.7, { main: true }),
      item('star', 100, 110, 0.85, { main: true }),
      item('star', 150, 140, 0.7, { main: true }),
      item('hanuman', 100, 200, 0.6, { pose: 'hero' }),
    ]),
    scene('temple', 'glow', [
      item('hanuman', 78, 174, 0.9, { pose: 'glow', main: true }),
      item('child', 146, 190, 0.7),
    ]),
  ],
  'chaupai-38': [
    scene('garden', 'sparkle', [item('beads', 100, 156, 1.25, { main: true })]),
    scene('dawn', 'pop', [
      item('rope', 100, 140, 1.1, { main: true }),
      item('sun', 100, 200, 0.55),
    ]),
  ],
  'chaupai-39': [
    scene('garden', 'sway', [
      item('book', 78, 168, 1.15, { main: true }),
      item('child', 148, 186, 0.75),
    ]),
    scene('dawn', 'glow', [item('shiva', 100, 168, 1.05, { main: true })]),
  ],
  'chaupai-40': [
    scene('garden', 'sway', [
      item('tulsidas', 78, 174, 0.95, { main: true }),
      item('book', 145, 176, 0.85),
    ]),
    scene('heart', 'heartbeat', [item('homeheart', 100, 150, 1.35, { main: true })]),
  ],
  'doha-close': [
    scene('heart', 'heartbeat', [item('homeheart', 100, 150, 1.4, { main: true })]),
    scene('palace', 'glow', [
      item('rama', 48, 180, 0.62),
      item('sita', 84, 172, 0.62),
      item('lakshman', 120, 182, 0.58),
      item('hanuman', 158, 176, 0.7, { pose: 'glow', main: true }),
    ]),
  ],
}

export function scenesFor(id: string): [SceneSpec, SceneSpec] {
  const pair = storyboard[id]
  if (!pair) throw new Error(`Missing pictures for ${id}`)
  return pair
}
