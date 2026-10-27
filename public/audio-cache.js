/* global self, caches, fetch, Response */
// Cache full verse files, then answer Chrome/Safari range requests from that copy.
// Workbox precaching does not satisfy media element Range headers.
const AUDIO_CACHE = 'little-chalisa-audio-v1'

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  if (!url.pathname.includes('/audio/') || !url.pathname.endsWith('.m4a')) return
  event.respondWith(serveAudio(event.request))
})

async function serveAudio(request) {
  const cache = await caches.open(AUDIO_CACHE)
  const key = request.url.split('#')[0]
  let stored = await cache.match(key)
  if (!stored) {
    try {
      const fresh = await fetch(new Request(key))
      if (!fresh.ok) return fresh
      await cache.put(key, fresh.clone())
      stored = fresh
    } catch {
      return new Response('', { status: 503, statusText: 'Audio unavailable offline' })
    }
  }

  const range = request.headers.get('range')
  if (!range) return stored

  const bytes = await stored.arrayBuffer()
  const total = bytes.byteLength
  const match = /bytes=(\d+)-(\d+)?/.exec(range)
  if (!match) return stored
  const start = Number(match[1])
  const end = match[2] ? Number(match[2]) : total - 1
  if (start >= total || end < start) {
    return new Response(null, {
      status: 416,
      headers: { 'Content-Range': `bytes */${total}` },
    })
  }
  const chunk = bytes.slice(start, end + 1)
  return new Response(chunk, {
    status: 206,
    headers: {
      'Content-Type': stored.headers.get('Content-Type') || 'audio/mp4',
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Content-Length': String(chunk.byteLength),
      'Accept-Ranges': 'bytes',
    },
  })
}
