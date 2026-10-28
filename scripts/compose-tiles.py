"""Paint the four story tiles for every verse from shared illustration sprites."""
import json
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = Path('/opt/cursor/artifacts/assets')
OUT = ROOT / 'public' / 'art' / 'tiles'
W, H = 480, 672

FILES = {
    'hanuman-stand': 'hanuman-stand-magenta.jpg',
    'hanuman-fly': 'hanuman-fly-magenta.jpg',
    'hanuman-bow': 'hanuman-bow-magenta.jpg',
    'hanuman-hero': 'hanuman-hero-magenta.jpg',
    'rama': 'rama-magenta.jpg',
    'sita': 'sita-magenta.jpg',
    'lakshman': 'lakshman-magenta.jpg',
    'child': 'child-magenta.jpg',
    'sun': 'prop-sun-magenta.jpg',
    'fruits': 'prop-fruits-magenta.jpg',
    'book': 'prop-book-magenta.jpg',
    'heart': 'prop-heart-magenta.jpg',
    'star': 'prop-star-magenta.jpg',
    'mountain': 'prop-mountain-magenta.jpg',
    'lotus': 'prop-lotus-magenta.jpg',
    'flames': 'prop-flames-magenta.jpg',
    'mace': 'prop-mace-magenta.jpg',
    'shield': 'prop-shield-magenta.jpg',
    'cloud': 'prop-cloud-magenta.jpg',
    'worlds': 'prop-worlds-magenta.jpg',
    'ring': 'prop-ring-magenta.jpg',
    'mirror': 'prop-mirror-magenta.jpg',
}

ALIASES = {
    'sunfruit': 'sun',
    'notes': 'book',
    'beads': 'book',
    'letter': 'book',
    'veena': 'book',
    'homeheart': 'heart',
    'gems': 'star',
    'dust': 'star',
    'seasons': 'star',
    'thread': 'hanuman-stand',
    'wind': 'cloud',
    'blob': 'cloud',
    'diya': 'flames',
    'ribbon': 'heart',
    'jar': 'heart',
    'rope': 'mace',
    'flag': 'star',
    'baskets': 'fruits',
    'path': 'mountain',
    'palace': 'mountain',
    'gate': 'mountain',
    'city': 'mountain',
    'baby': 'hanuman-stand',
    'anjani': 'sita',
    'saraswati': 'sita',
    'sage': 'child',
    'narad': 'child',
    'tulsidas': 'child',
    'shiva': 'rama',
    'vibhishan': 'lakshman',
    'sugriva': 'hanuman-stand',
    'singers': 'child',
    'bowing': 'child',
    'friends': 'child',
}

CHARACTERS = {
    'hanuman-stand',
    'hanuman-fly',
    'hanuman-bow',
    'hanuman-hero',
    'rama',
    'sita',
    'lakshman',
    'child',
}


def key_color(im: Image.Image) -> tuple[int, int, int]:
    w, h = im.size
    samples = [
        im.getpixel((2, 2)),
        im.getpixel((w - 3, 2)),
        im.getpixel((2, h - 3)),
        im.getpixel((w - 3, h - 3)),
    ]
    return max(samples, key=lambda p: (p[0] + p[2]) - 2 * p[1])[:3]


def cut_out(path: Path) -> Image.Image:
    im = Image.open(path).convert('RGBA')
    kr, kg, kb = key_color(im)
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            dist = ((r - kr) ** 2 + (g - kg) ** 2 + (b - kb) ** 2) ** 0.5
            if dist < 78:
                px[x, y] = (0, 0, 0, 0)
            elif dist < 145:
                alpha = int(255 * (dist - 78) / 67)
                px[x, y] = (r, g, b, min(a, alpha))
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    return im


def cover(im: Image.Image) -> Image.Image:
    im = im.convert('RGB')
    sw, sh = im.size
    scale = max(W / sw, H / sh)
    nw, nh = max(1, int(sw * scale) + 1), max(1, int(sh * scale) + 1)
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    left = max(0, (nw - W) // 2)
    top = max(0, (nh - H) // 2)
    return im.crop((left, top, left + W, top + H))


def sprite_name(item: dict) -> str:
    key = item['k']
    pose = item.get('pose') or ''
    if key == 'hanuman':
        if pose == 'fly':
            return 'hanuman-fly'
        if pose == 'bow':
            return 'hanuman-bow'
        if pose in ('hero', 'guard', 'big'):
            return 'hanuman-hero'
        return 'hanuman-stand'
    return ALIASES.get(key, key)


def paste_sprite(canvas: Image.Image, sprite: Image.Image, item: dict, name: str) -> None:
    scale = float(item.get('s') or 1)
    if item.get('flip'):
        sprite = sprite.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    kind = 0.5 if name in CHARACTERS or name.startswith('hanuman') else 0.4
    target_h = max(48, int(scale * kind * H))
    target_w = max(48, int(sprite.width * (target_h / sprite.height)))
    sprite = sprite.resize((target_w, target_h), Image.Resampling.LANCZOS)
    anchor_x = item['x'] / 200 * W
    anchor_y = item['y'] / 280 * H
    left = int(anchor_x - target_w / 2)
    top = int(anchor_y - target_h * 0.78)
    if name in CHARACTERS or name.startswith('hanuman'):
        shadow = Image.new('RGBA', canvas.size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(shadow)
        draw.ellipse(
            [left + target_w * 0.2, top + target_h * 0.9, left + target_w * 0.8, top + target_h * 0.98],
            fill=(92, 49, 23, 70),
        )
        shadow = shadow.filter(ImageFilter.GaussianBlur(4))
        canvas.alpha_composite(shadow)
    canvas.alpha_composite(sprite, (left, top))


def main() -> None:
    raw = subprocess.check_output(
        ['node', '--experimental-strip-types', '--input-type=module', '-e',
         "import { storyboard } from './src/art/scenes.ts'; process.stdout.write(JSON.stringify(storyboard))"],
        cwd=ROOT,
    )
    storyboard = json.loads(raw)
    cache: dict[str, Image.Image] = {}

    def sprite(name: str) -> Image.Image | None:
        if name not in cache:
            filename = FILES.get(name)
            if not filename or not (SRC / filename).exists():
                cache[name] = None
            else:
                cache[name] = cut_out(SRC / filename)
        return cache[name]

    OUT.mkdir(parents=True, exist_ok=True)
    missing = set()
    count = 0
    for piece_id, tiles in storyboard.items():
        for index, tile in enumerate(tiles):
            bg_path = SRC / f"bg-{tile['bg']}.jpg"
            if not bg_path.exists():
                bg_path = SRC / 'bg-meadow.jpg'
            canvas = cover(Image.open(bg_path)).convert('RGBA')
            for item in tile['items']:
                name = sprite_name(item)
                image = sprite(name)
                if item['k'] in ('earrings', 'curls'):
                    base = sprite('hanuman-stand')
                    if base is not None:
                        bw, bh = base.size
                        box = (0.12, 0.0, 0.88, 0.42) if item['k'] == 'curls' else (0.08, 0.12, 0.92, 0.5)
                        image = base.crop((int(box[0] * bw), int(box[1] * bh), int(box[2] * bw), int(box[3] * bh)))
                        px = image.load()
                        cw, ch = image.size
                        start = int(ch * 0.72)
                        for y in range(start, ch):
                            fade = 1 - (y - start) / max(1, ch - start)
                            for x in range(cw):
                                r, g, b, a = px[x, y]
                                px[x, y] = (r, g, b, int(a * fade))
                        name = 'detail'
                if image is None:
                    missing.add(item['k'])
                    continue
                if item.get('pose') == 'glow' or tile['anim'] == 'glow' and item.get('main'):
                    glow = Image.new('RGBA', canvas.size, (0, 0, 0, 0))
                    draw = ImageDraw.Draw(glow)
                    cx = item['x'] / 200 * W
                    cy = item['y'] / 280 * H - 30
                    draw.ellipse([cx - 90, cy - 110, cx + 90, cy + 120], fill=(255, 214, 120, 80))
                    canvas.alpha_composite(glow.filter(ImageFilter.GaussianBlur(12)))
                paste_sprite(canvas, image, item, name)
            dest = OUT / f'{piece_id}-{index}.webp'
            canvas.convert('RGB').save(dest, 'WEBP', quality=72, method=6)
            count += 1
    print(f'wrote {count} tiles, missing sprites: {sorted(missing)}')


if __name__ == '__main__':
    main()
