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

/** Four meaning tiles per verse: left top, left bottom, right top, right bottom. */
export const storyboard: Record<string, [SceneSpec, SceneSpec, SceneSpec, SceneSpec]> = {
  'doha-1': [
    // Lotus feet of the guru
    scene('temple', 'glow', [item('lotus', 100, 155, 1.25, { main: true })]),
    // Dust clears the mind
    scene('dawn', 'sparkle', [item('mirror', 100, 148, 1.05, { main: true }), item('dust', 100, 78, 0.85)]),
    // Glory of Lord Rama
    scene('palace', 'glow', [item('rama', 100, 168, 1.05, { main: true })]),
    // Four fruits of life
    scene('meadow', 'float', [item('fruits', 100, 150, 1.15, { main: true })]),
  ],
  'doha-2': [
    // A small unsure heart
    scene('meadow', 'sway', [item('child', 100, 175, 1.05, { main: true })]),
    // Remember the wind’s son
    scene('sky', 'float', [item('hanuman', 118, 168, 0.95, { pose: 'glow', main: true }), item('wind', 58, 140, 0.75)]),
    // Strength, mind, and learning
    scene('dawn', 'sparkle', [item('mace', 58, 155, 0.85, { main: true }), item('book', 118, 160, 0.8, { main: true }), item('star', 150, 100, 0.55)]),
    // Troubles blown away
    scene('sky', 'rise', [item('hanuman', 78, 175, 0.85, { pose: 'hero', main: true }), item('cloud', 145, 130, 0.9, { main: true })]),
  ],
  'chaupai-1': [
    // Victory to Hanuman
    scene('dawn', 'bounce', [item('hanuman', 100, 162, 1.05, { pose: 'hero', main: true })]),
    // Ocean of wisdom
    scene('ocean', 'glow', [item('hanuman', 100, 155, 1, { pose: 'glow', main: true })]),
    // The monkey king
    scene('palace', 'pop', [item('hanuman', 100, 162, 1.05, { pose: 'guard', main: true })]),
    // Light for three worlds
    scene('cosmos', 'sparkle', [item('worlds', 100, 145, 1.2, { main: true })]),
  ],
  'chaupai-2': [
    // Rama’s messenger
    scene('sky', 'float', [item('hanuman', 72, 175, 0.9, { pose: 'fly', main: true }), item('letter', 145, 145, 0.95, { main: true })]),
    // Home of great power
    scene('dawn', 'pop', [item('hanuman', 100, 162, 1.05, { pose: 'hero', main: true }), item('mace', 155, 150, 0.7, { main: true })]),
    // Anjani’s little son
    scene('garden', 'glow', [item('anjani', 70, 175, 0.85), item('baby', 140, 185, 1, { main: true })]),
    // Son of the wind
    scene('sky', 'sway', [item('hanuman', 120, 170, 0.95, { pose: 'fly', main: true }), item('wind', 55, 145, 0.8)]),
  ],
  'chaupai-3': [
    // Mighty brave Hanuman
    scene('dawn', 'pop', [item('hanuman', 100, 162, 1.15, { pose: 'hero', main: true })]),
    // Body strong as diamond
    scene('temple', 'glow', [item('shield', 100, 150, 1.25, { main: true })]),
    // Bad thoughts leave
    scene('sky', 'float', [item('cloud', 100, 145, 1.2, { main: true })]),
    // Friend of good minds
    scene('meadow', 'bounce', [item('friends', 100, 165, 1.15, { main: true })]),
  ],
  'chaupai-4': [
    // Golden Hanuman
    scene('dawn', 'glow', [item('hanuman', 100, 162, 1.12, { pose: 'glow', main: true })]),
    // Beautiful clothes
    scene('palace', 'sparkle', [item('hanuman', 100, 162, 1.05, { pose: 'hero', main: true })]),
    // Gold earrings
    scene('temple', 'sway', [item('earrings', 100, 150, 1.3, { main: true })]),
    // Curly hair
    scene('garden', 'bounce', [item('curls', 100, 145, 1.25, { main: true })]),
  ],
  'chaupai-5': [
    // Mace in his hand
    scene('dawn', 'pop', [item('mace', 100, 150, 1.2, { main: true })]),
    // Victory flag
    scene('sky', 'sway', [item('flag', 100, 155, 1.05, { main: true })]),
    // Sacred thread
    scene('temple', 'glow', [item('thread', 100, 150, 1.2, { main: true })]),
    // Thread on his shoulder
    scene('meadow', 'glow', [item('hanuman', 100, 162, 1.05, { pose: 'stand', main: true })]),
  ],
  'chaupai-6': [
    // A form of Shiva
    scene('temple', 'glow', [item('shiva', 100, 168, 1.05, { main: true })]),
    // Son of Kesari
    scene('dawn', 'pop', [item('hanuman', 100, 162, 1.05, { pose: 'hero', main: true })]),
    // Great shining glory
    scene('cosmos', 'sparkle', [item('star', 100, 145, 1.35, { main: true })]),
    // The world bows
    scene('palace', 'sway', [item('bowing', 100, 165, 1.15, { main: true })]),
  ],
  'chaupai-7': [
    // Full of learning
    scene('garden', 'glow', [item('book', 100, 155, 1.2, { main: true })]),
    // Many good virtues
    scene('dawn', 'sparkle', [item('gems', 100, 150, 1.15, { main: true })]),
    // Very clever
    scene('meadow', 'bounce', [item('hanuman', 100, 162, 1.05, { pose: 'glow', main: true })]),
    // Eager for Rama’s work
    scene('palace', 'float', [item('hanuman', 70, 175, 0.9, { pose: 'fly', main: true }), item('rama', 145, 170, 0.85)]),
  ],
  'chaupai-8': [
    // Loves Rama’s story
    scene('garden', 'sway', [item('hanuman', 68, 175, 0.85, { pose: 'glow', main: true }), item('book', 140, 155, 0.95, { main: true })]),
    // Happy listening
    scene('dawn', 'float', [item('notes', 100, 145, 1.15, { main: true })]),
    // Rama, Sita, Lakshman
    scene('palace', 'glow', [item('rama', 55, 175, 0.72), item('sita', 105, 168, 0.78, { main: true }), item('lakshman', 155, 178, 0.68)]),
    // They live in his heart
    scene('heart', 'heartbeat', [item('heart', 100, 140, 1.3, { main: true }), item('hanuman', 100, 210, 0.45, { pose: 'glow', main: true })]),
  ],
  'chaupai-9': [
    // Tiny as a thumb
    scene('palace', 'pop', [item('hanuman', 100, 185, 0.55, { pose: 'bow', main: true })]),
    // He meets Sita
    scene('garden', 'glow', [item('sita', 100, 168, 1.05, { main: true })]),
    // Giant Hanuman
    scene('lanka', 'rise', [item('hanuman', 100, 165, 1.2, { pose: 'big', main: true })]),
    // Lanka in flames
    scene('lanka', 'sparkle', [item('flames', 100, 140, 1.15, { main: true }), item('palace', 100, 195, 0.65)]),
  ],
  'chaupai-10': [
    // A fierce brave form
    scene('dawn', 'pop', [item('hanuman', 100, 162, 1.12, { pose: 'hero', main: true })]),
    // Demons step back
    scene('night', 'sway', [item('blob', 70, 165, 0.95, { main: true }), item('blob', 140, 150, 0.7, { flip: true, main: true })]),
    // Rama’s great work
    scene('palace', 'glow', [item('rama', 100, 168, 1.05, { main: true })]),
    // The work made easy
    scene('meadow', 'rise', [item('path', 100, 160, 1.15, { main: true }), item('hanuman', 100, 200, 0.45, { pose: 'fly', main: true })]),
  ],
  'chaupai-11': [
    // The Sanjeevani mountain
    scene('mountain', 'rise', [item('mountain', 100, 145, 1.15, { main: true })]),
    // Hanuman carries it
    scene('sky', 'float', [item('hanuman', 70, 180, 0.85, { pose: 'fly', main: true }), item('mountain', 145, 130, 0.65, { main: true })]),
    // Lakshman lives again
    scene('garden', 'glow', [item('lakshman', 100, 168, 1.05, { main: true })]),
    // Rama hugs him
    scene('meadow', 'heartbeat', [item('rama', 70, 172, 0.9), item('hanuman', 135, 175, 0.9, { pose: 'glow', main: true })]),
  ],
  'chaupai-12': [
    // Rama gives praise
    scene('palace', 'glow', [item('rama', 100, 168, 1.05, { main: true })]),
    // Hanuman is honored
    scene('dawn', 'sway', [item('hanuman', 100, 162, 1.05, { pose: 'bow', main: true })]),
    // Dear as a brother
    scene('heart', 'heartbeat', [item('heart', 100, 145, 1.25, { main: true })]),
    // Standing side by side
    scene('meadow', 'sway', [item('rama', 70, 172, 0.9), item('hanuman', 140, 175, 0.9, { pose: 'stand', main: true })]),
  ],
  'chaupai-13': [
    // Thousands of voices
    scene('sky', 'float', [item('singers', 100, 165, 1.15, { main: true })]),
    // They sing his glory
    scene('dawn', 'sparkle', [item('notes', 100, 145, 1.2, { main: true })]),
    // Rama speaks kindly
    scene('palace', 'glow', [item('rama', 100, 168, 1.05, { main: true })]),
    // A warm hug
    scene('garden', 'heartbeat', [item('rama', 72, 172, 0.9), item('hanuman', 138, 176, 0.9, { pose: 'glow', main: true })]),
  ],
  'chaupai-14': [
    // Wise sages gather
    scene('temple', 'glow', [item('sage', 100, 170, 1, { main: true })]),
    // Gods bow too
    scene('cosmos', 'sway', [item('bowing', 100, 165, 1.15, { main: true })]),
    // Narad with his veena
    scene('garden', 'float', [item('narad', 70, 175, 0.85), item('veena', 140, 165, 0.95, { main: true })]),
    // Saraswati sings
    scene('dawn', 'sparkle', [item('saraswati', 100, 168, 1, { main: true })]),
  ],
  'chaupai-15': [
    // Even guardians try
    scene('night', 'sway', [item('bowing', 100, 165, 1.1, { main: true })]),
    // Treasures are not enough
    scene('palace', 'sparkle', [item('gems', 100, 150, 1.15, { main: true })]),
    // Poets and singers
    scene('garden', 'float', [item('singers', 100, 165, 1.1, { main: true })]),
    // Words fall short
    scene('cosmos', 'glow', [item('star', 100, 120, 0.9, { main: true }), item('dust', 100, 185, 1)]),
  ],
  'chaupai-16': [
    // Help for Sugriva
    scene('meadow', 'bounce', [item('sugriva', 70, 175, 0.9), item('hanuman', 140, 172, 0.9, { pose: 'stand', main: true })]),
    // He meets Rama
    scene('palace', 'glow', [item('rama', 100, 168, 1.05, { main: true })]),
    // A kingdom returned
    scene('dawn', 'rise', [item('palace', 100, 155, 1.15, { main: true })]),
    // Sugriva wears the crown
    scene('garden', 'sparkle', [item('sugriva', 100, 170, 1.05, { main: true }), item('star', 100, 95, 0.55)]),
  ],
  'chaupai-17': [
    // Advice for Vibhishan
    scene('lanka', 'sway', [item('hanuman', 65, 175, 0.85, { pose: 'glow', main: true }), item('vibhishan', 145, 172, 0.9)]),
    // Vibhishan listens
    scene('dawn', 'glow', [item('vibhishan', 100, 168, 1.05, { main: true })]),
    // King of Lanka
    scene('palace', 'pop', [item('palace', 100, 150, 1.15, { main: true })]),
    // The whole world knows
    scene('cosmos', 'sparkle', [item('worlds', 100, 150, 1.15, { main: true })]),
  ],
  'chaupai-18': [
    // A sun very far away
    scene('sky', 'glow', [item('sun', 100, 140, 1.15, { main: true })]),
    // Hanuman flies to it
    scene('dawn', 'rise', [item('hanuman', 100, 162, 1.05, { pose: 'fly', main: true })]),
    // He thinks it is fruit
    scene('sky', 'pop', [item('sunfruit', 100, 140, 1.15, { main: true })]),
    // A sweet glowing fruit
    scene('meadow', 'float', [item('fruits', 100, 150, 1.15, { main: true })]),
  ],
  'chaupai-19': [
    // Rama’s ring
    scene('palace', 'sparkle', [item('ring', 100, 145, 1.35, { main: true })]),
    // The ring held safe
    scene('dawn', 'glow', [item('hanuman', 78, 172, 0.9, { pose: 'glow', main: true }), item('ring', 145, 145, 1, { main: true })]),
    // A wide ocean
    scene('ocean', 'sway', [item('wind', 100, 140, 1, { main: true })]),
    // He leaps across
    scene('ocean', 'rise', [item('hanuman', 100, 150, 1.05, { pose: 'fly', main: true })]),
  ],
  'chaupai-20': [
    // A hard rocky path
    scene('mountain', 'sway', [item('path', 100, 160, 1.2, { main: true })]),
    // Hard work in the world
    scene('cosmos', 'glow', [item('worlds', 100, 150, 1.1, { main: true })]),
    // The path grows easy
    scene('meadow', 'rise', [item('path', 100, 165, 1.15, { main: true }), item('star', 100, 95, 0.5)]),
    // Grace helps a child
    scene('dawn', 'glow', [item('child', 68, 180, 0.85), item('hanuman', 140, 165, 0.95, { pose: 'glow', main: true })]),
  ],
  'chaupai-21': [
    // Rama’s doorway
    scene('palace', 'glow', [item('gate', 100, 155, 1.15, { main: true })]),
    // Hanuman keeps watch
    scene('temple', 'pop', [item('hanuman', 100, 162, 1.05, { pose: 'guard', main: true })]),
    // The gate stays shut
    scene('night', 'sway', [item('gate', 100, 155, 1.1, { main: true })]),
    // Enter only if he says
    scene('dawn', 'glow', [item('hanuman', 70, 180, 0.85, { pose: 'bow', main: true }), item('rama', 145, 165, 0.85)]),
  ],
  'chaupai-22': [
    // Safe in his shelter
    scene('garden', 'glow', [item('hanuman', 115, 165, 1, { pose: 'glow', main: true }), item('child', 55, 190, 0.7)]),
    // Happiness follows
    scene('meadow', 'float', [item('fruits', 100, 150, 1.1, { main: true })]),
    // A strong protector
    scene('dawn', 'pop', [item('shield', 100, 148, 1.25, { main: true })]),
    // Fear melts away
    scene('sky', 'rise', [item('sun', 100, 130, 0.9, { main: true }), item('cloud', 100, 190, 0.8)]),
  ],
  'chaupai-23': [
    // Power held calmly
    scene('cosmos', 'glow', [item('hanuman', 100, 162, 1.05, { pose: 'glow', main: true })]),
    // Only he can hold it
    scene('dawn', 'pop', [item('mace', 100, 150, 1.2, { main: true })]),
    // The three worlds
    scene('night', 'sparkle', [item('worlds', 100, 150, 1.2, { main: true })]),
    // They tremble at his roar
    scene('sky', 'sway', [item('worlds', 100, 155, 1.1, { main: true })]),
  ],
  'chaupai-24': [
    // Shadows stay away
    scene('night', 'float', [item('blob', 70, 160, 0.8, { main: true }), item('blob', 140, 175, 0.6, { flip: true })]),
    // The brave name
    scene('dawn', 'pop', [item('hanuman', 100, 162, 1.05, { pose: 'hero', main: true })]),
    // The name is heard
    scene('garden', 'sparkle', [item('notes', 100, 145, 1.15, { main: true })]),
    // A glowing shield
    scene('temple', 'glow', [item('shield', 100, 148, 1.25, { main: true })]),
  ],
  'chaupai-25': [
    // A healing lamp
    scene('dawn', 'glow', [item('diya', 100, 150, 1.3, { main: true })]),
    // Pain grows quiet
    scene('heart', 'heartbeat', [item('heart', 100, 145, 1.2, { main: true })]),
    // Saying his name
    scene('garden', 'bounce', [item('child', 75, 180, 0.9), item('notes', 145, 145, 0.85, { main: true })]),
    // Brave Hanuman
    scene('meadow', 'pop', [item('hanuman', 100, 162, 1.05, { pose: 'hero', main: true })]),
  ],
  'chaupai-26': [
    // Free from a tangle
    scene('sky', 'rise', [item('ribbon', 100, 145, 1.2, { main: true })]),
    // Remembered in the mind
    scene('dawn', 'glow', [item('child', 100, 175, 1.05, { main: true })]),
    // Remembered in actions
    scene('meadow', 'bounce', [item('hanuman', 100, 162, 1.05, { pose: 'hero', main: true })]),
    // Remembered in words
    scene('garden', 'sparkle', [item('notes', 100, 145, 1.15, { main: true })]),
  ],
  'chaupai-27': [
    // Rama the great king
    scene('palace', 'glow', [item('rama', 100, 168, 1.05, { main: true })]),
    // King of the yogis
    scene('temple', 'sway', [item('sage', 100, 170, 1, { main: true })]),
    // Tasks set in order
    scene('garden', 'bounce', [item('baskets', 100, 155, 1.1, { main: true })]),
    // Hanuman does the work
    scene('dawn', 'float', [item('hanuman', 100, 162, 1.05, { pose: 'fly', main: true })]),
  ],
  'chaupai-28': [
    // A wish like a star
    scene('night', 'sparkle', [item('star', 100, 140, 1.3, { main: true })]),
    // Brought to Hanuman
    scene('dawn', 'glow', [item('child', 65, 185, 0.8), item('hanuman', 140, 165, 0.95, { pose: 'glow', main: true })]),
    // Fruits of a full life
    scene('meadow', 'float', [item('fruits', 100, 150, 1.15, { main: true })]),
    // Light for the world
    scene('sky', 'rise', [item('sun', 100, 120, 0.85, { main: true }), item('worlds', 100, 190, 0.7)]),
  ],
  'chaupai-29': [
    // Glory in four ages
    scene('garden', 'sparkle', [item('seasons', 100, 150, 1.2, { main: true })]),
    // Hanuman still shines
    scene('dawn', 'glow', [item('hanuman', 100, 162, 1.05, { pose: 'glow', main: true })]),
    // Famous in the world
    scene('cosmos', 'float', [item('worlds', 100, 150, 1.15, { main: true })]),
    // The world lit bright
    scene('sky', 'rise', [item('sun', 100, 140, 1.15, { main: true })]),
  ],
  'chaupai-30': [
    // Guard of good people
    scene('garden', 'glow', [item('hanuman', 115, 168, 1, { pose: 'guard', main: true }), item('child', 50, 190, 0.65)]),
    // Sages kept safe
    scene('temple', 'sway', [item('sage', 100, 170, 1, { main: true })]),
    // Demons turned away
    scene('night', 'pop', [item('hanuman', 75, 170, 0.9, { pose: 'hero', main: true }), item('blob', 150, 170, 0.75)]),
    // Dear to Rama
    scene('palace', 'heartbeat', [item('rama', 70, 170, 0.9), item('hanuman', 140, 178, 0.85, { pose: 'bow', main: true })]),
  ],
  'chaupai-31': [
    // Eight special powers
    scene('cosmos', 'sparkle', [item('gems', 100, 150, 1.1, { main: true })]),
    // Nine treasures
    scene('palace', 'glow', [item('gems', 100, 155, 1.15, { main: true }), item('star', 100, 85, 0.45)]),
    // Sita gives a blessing
    scene('garden', 'glow', [item('sita', 100, 168, 1.05, { main: true })]),
    // The gift is for Hanuman
    scene('dawn', 'heartbeat', [item('hanuman', 100, 162, 1.05, { pose: 'bow', main: true })]),
  ],
  'chaupai-32': [
    // A jar of devotion
    scene('temple', 'glow', [item('jar', 100, 150, 1.3, { main: true })]),
    // Hanuman holds it
    scene('dawn', 'pop', [item('hanuman', 75, 170, 0.9, { pose: 'glow', main: true }), item('jar', 145, 155, 0.85, { main: true })]),
    // Always Rama’s devotee
    scene('meadow', 'sway', [item('hanuman', 100, 162, 1.05, { pose: 'bow', main: true })]),
    // Servant of Rama
    scene('palace', 'glow', [item('rama', 100, 168, 1.05, { main: true })]),
  ],
  'chaupai-33': [
    // Singing together
    scene('garden', 'float', [item('singers', 100, 165, 1.15, { main: true })]),
    // The song leads to Rama
    scene('palace', 'glow', [item('rama', 100, 168, 1.05, { main: true })]),
    // Sorrows float away
    scene('sky', 'rise', [item('cloud', 100, 145, 1.2, { main: true })]),
    // Peace across lives
    scene('dawn', 'sparkle', [item('child', 100, 185, 0.85), item('sun', 100, 105, 0.7, { main: true })]),
  ],
  'chaupai-34': [
    // A peaceful journey
    scene('meadow', 'rise', [item('path', 100, 165, 1.1, { main: true }), item('child', 80, 175, 0.7, { main: true })]),
    // Rama’s bright city
    scene('night', 'glow', [item('city', 100, 155, 1.15, { main: true })]),
    // Born as a devotee
    scene('dawn', 'bounce', [item('child', 70, 180, 0.85), item('hanuman', 140, 168, 0.9, { pose: 'glow', main: true })]),
    // Loved by Rama
    scene('heart', 'heartbeat', [item('heart', 100, 145, 1.25, { main: true })]),
  ],
  'chaupai-35': [
    // A happy heart
    scene('heart', 'heartbeat', [item('heart', 78, 145, 1.05, { main: true }), item('hanuman', 140, 175, 0.8, { pose: 'glow', main: true })]),
    // Attention stays here
    scene('temple', 'glow', [item('star', 100, 140, 1.2, { main: true })]),
    // All kinds of happiness
    scene('meadow', 'float', [item('fruits', 100, 150, 1.15, { main: true })]),
    // A joyful child
    scene('garden', 'bounce', [item('child', 100, 172, 1.1, { main: true })]),
  ],
  'chaupai-36': [
    // A trouble-rope cut
    scene('sky', 'pop', [item('rope', 100, 145, 1.25, { main: true })]),
    // Pain leaves
    scene('heart', 'rise', [item('heart', 100, 145, 1.15, { main: true })]),
    // Remember Hanuman
    scene('dawn', 'glow', [item('hanuman', 100, 162, 1.05, { pose: 'glow', main: true })]),
    // Mighty and brave
    scene('meadow', 'bounce', [item('hanuman', 100, 162, 1.05, { pose: 'hero', main: true })]),
  ],
  'chaupai-37': [
    // Victory
    scene('sky', 'sparkle', [item('star', 100, 140, 1.3, { main: true })]),
    // Victory again
    scene('dawn', 'bounce', [item('hanuman', 100, 162, 1.05, { pose: 'hero', main: true })]),
    // Victory once more
    scene('cosmos', 'pop', [item('star', 70, 140, 0.85, { main: true }), item('star', 140, 155, 0.7, { main: true })]),
    // Kind like a guru
    scene('garden', 'glow', [item('hanuman', 120, 165, 1, { pose: 'glow', main: true }), item('child', 55, 190, 0.7)]),
  ],
  'chaupai-38': [
    // Count the recitations
    scene('garden', 'sparkle', [item('beads', 100, 150, 1.25, { main: true })]),
    // Say it many times
    scene('dawn', 'sway', [item('book', 100, 155, 1.15, { main: true })]),
    // Old bonds open
    scene('sky', 'pop', [item('rope', 100, 145, 1.2, { main: true })]),
    // Great joy arrives
    scene('meadow', 'rise', [item('sun', 100, 135, 1.1, { main: true })]),
  ],
  'chaupai-39': [
    // Read the Chalisa
    scene('garden', 'sway', [item('book', 100, 155, 1.2, { main: true })]),
    // A child reads along
    scene('meadow', 'bounce', [item('child', 75, 180, 0.9), item('book', 145, 155, 0.85, { main: true })]),
    // A wish comes true
    scene('dawn', 'sparkle', [item('star', 100, 140, 1.25, { main: true })]),
    // Shiva is the witness
    scene('temple', 'glow', [item('shiva', 100, 168, 1.05, { main: true })]),
  ],
  'chaupai-40': [
    // Poet Tulsidas
    scene('garden', 'sway', [item('tulsidas', 100, 170, 1.05, { main: true })]),
    // Always Rama’s devotee
    scene('dawn', 'glow', [item('book', 100, 155, 1.15, { main: true })]),
    // Please live in this heart
    scene('heart', 'heartbeat', [item('homeheart', 100, 145, 1.3, { main: true })]),
    // A home in the heart
    scene('palace', 'glow', [item('heart', 100, 145, 1.2, { main: true })]),
  ],
  'doha-close': [
    // Son of the wind
    scene('sky', 'float', [item('hanuman', 120, 168, 0.95, { pose: 'fly', main: true }), item('wind', 55, 140, 0.75)]),
    // He removes troubles
    scene('dawn', 'pop', [item('shield', 100, 148, 1.2, { main: true })]),
    // An auspicious form
    scene('temple', 'glow', [item('hanuman', 100, 162, 1.12, { pose: 'glow', main: true })]),
    // Rama’s family in the heart
    scene('palace', 'heartbeat', [item('rama', 48, 180, 0.62), item('sita', 90, 170, 0.62), item('lakshman', 128, 182, 0.58), item('hanuman', 168, 172, 0.7, { pose: 'glow', main: true })]),
  ],

}

export function scenesFor(id: string): [SceneSpec, SceneSpec, SceneSpec, SceneSpec] {
  const tiles = storyboard[id]
  if (!tiles) throw new Error(`Missing pictures for ${id}`)
  return tiles
}
