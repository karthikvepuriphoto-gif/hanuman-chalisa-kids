#!/usr/bin/env python3
"""Draw the Little Chalisa app icons without extra libraries."""

import math
import pathlib
import struct
import zlib


def chunk(tag: bytes, data: bytes) -> bytes:
    return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)


def write_png(path: pathlib.Path, size: int) -> None:
    raw = bytearray()
    for y in range(size):
        raw.append(0)
        for x in range(size):
            raw.extend(pixel(x + 0.5, y + 0.5, size))
    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0))
    png += chunk(b"IDAT", zlib.compress(bytes(raw), 9))
    png += chunk(b"IEND", b"")
    path.write_bytes(png)


def mix(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(4))


def cover(base, color, alpha):
    if alpha <= 0:
        return base
    t = max(0.0, min(1.0, alpha))
    return mix(base, color, t)


def pixel(x, y, size):
    n = size / 64
    px, py = x / n, y / n
    cream = (255, 246, 234, 255)
    # rounded square
    dx = abs(px - 32) - 20
    dy = abs(py - 32) - 20
    outside = math.hypot(max(dx, 0), max(dy, 0)) - 8
    if outside > 1.2:
        return (0, 0, 0, 0)
    color = cream
    edge = max(0.0, min(1.0, 0.5 - outside))
    color = cover(color, (255, 246, 234, 255), edge)

    def disc(cx, cy, rx, ry, fill):
        nonlocal color
        nx = (px - cx) / rx
        ny = (py - cy) / ry
        d = 1 - math.hypot(nx, ny)
        color = cover(color, fill, d * 8)

    disc(14, 30, 7, 9, (244, 161, 90, 255))
    disc(50, 30, 7, 9, (244, 161, 90, 255))
    disc(32, 30, 16, 16, (246, 177, 122, 255))
    disc(32, 34, 10, 9, (248, 201, 160, 255))
    disc(26.5, 30, 2.1, 2.1, (61, 43, 34, 255))
    disc(37.5, 30, 2.1, 2.1, (61, 43, 34, 255))
    # smile
    smile_y = 37 + ((px - 32) / 6) ** 2
    if 26 < px < 38 and abs(py - smile_y) < 0.8:
        color = cover(color, (140, 58, 47, 255), 1)
    # tilak
    if 30.6 < px < 33.4 and 22 < py < 26 and (py - 22) > abs(px - 32) * 2:
        color = cover(color, (200, 72, 42, 255), 1)
    # scarf
    if 18 < px < 46 and 48 < py < 58 and (py - 48) > abs(px - 32) * 0.15:
        color = cover(color, (200, 72, 42, 255), 1)
    if outside > 0:
        color = (color[0], color[1], color[2], round(color[3] * max(0, 1 - outside)))
    return color


if __name__ == "__main__":
    out = pathlib.Path(__file__).resolve().parents[1] / "public" / "icons"
    out.mkdir(parents=True, exist_ok=True)
    write_png(out / "icon-192.png", 192)
    write_png(out / "icon-512.png", 512)
    write_png(out / "apple-touch-icon.png", 180)
    print("wrote icons")
