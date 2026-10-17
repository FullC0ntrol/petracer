/*
  Generuje ikony PWA (PNG) do public/ — bez zewnętrznych bibliotek.
  Uruchomienie:  node scripts/generate-icons.mjs

  Rysunek to ten sam motyw co public/favicon.svg (łapa na zielonym tle), opisany prostymi
  kształtami: elipsy i zaokrąglony kwadrat w układzie 64×64. Każdy piksel sprawdzamy w 16 punktach
  (4×4) i uśredniamy kolor — to wygładza krawędzie (antyaliasing).

  Plik PNG to: sygnatura + bloki IHDR (wymiary), IDAT (piksele skompresowane zlib) i IEND.
  Każdy blok kończy się sumą kontrolną CRC32.
*/
import { writeFileSync } from 'node:fs'
import { deflateSync } from 'node:zlib'

const PINE = [0x1f, 0x5e, 0x4b]
const PAPER = [0xfa, 0xf7, 0xf2]
const EMBER = [0xe0, 0x70, 0x3a]

const inEllipse = (x, y, cx, cy, rx, ry) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1

function inRoundedSquare(x, y, size, radius) {
  const dx = Math.max(radius - x, 0, x - (size - radius))
  const dy = Math.max(radius - y, 0, y - (size - radius))
  return x >= 0 && y >= 0 && x <= size && y <= size && dx * dx + dy * dy <= radius * radius
}

const PAW = [
  [20, 26, 5, 6.5],
  [29, 18, 5, 6.5],
  [39, 18, 5, 6.5],
  [46, 27, 5, 6.5],
  [33, 42, 13, 9.5],
  [33, 37, 8, 7],
]

/*
  Kolor punktu (x, y) w układzie 64×64.
  `maskable`: tło na całą powierzchnię, a łapa zmniejszona do „bezpiecznej strefy” (80% środka),
  bo Android przycina takie ikony do koła albo zaokrąglonego kwadratu.
  `rounded`: tło jako zaokrąglony kwadrat (zwykła ikona), poza nim przezroczystość.
*/
function colorAt(x, y, { maskable, rounded }) {
  if (rounded && !inRoundedSquare(x, y, 64, 14)) return null
  const scale = maskable ? 0.72 : 1
  const px = (x - 32) / scale + 32
  const py = (y - 32) / scale + 32
  if (!maskable && inEllipse(px, py, 50, 50, 6, 6)) return EMBER
  if (PAW.some(([cx, cy, rx, ry]) => inEllipse(px, py, cx, cy, rx, ry))) return PAPER
  return PINE
}

function render(size, options) {
  const samples = 4
  const rows = []
  for (let row = 0; row < size; row++) {
    const line = Buffer.alloc(1 + size * 4) // pierwszy bajt wiersza: typ filtra PNG (0 = brak)
    for (let col = 0; col < size; col++) {
      let r = 0, g = 0, b = 0, a = 0
      for (let sy = 0; sy < samples; sy++) {
        for (let sx = 0; sx < samples; sx++) {
          const color = colorAt(((col + (sx + 0.5) / samples) / size) * 64, ((row + (sy + 0.5) / samples) / size) * 64, options)
          if (!color) continue
          r += color[0]; g += color[1]; b += color[2]; a += 1
        }
      }
      const offset = 1 + col * 4
      if (a > 0) {
        line[offset] = Math.round(r / a)
        line[offset + 1] = Math.round(g / a)
        line[offset + 2] = Math.round(b / a)
      }
      line[offset + 3] = Math.round((a / (samples * samples)) * 255)
    }
    rows.push(line)
  }
  return encodePng(size, Buffer.concat(rows))
}

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})

function crc32(buffer) {
  let crc = 0xffffffff
  for (const byte of buffer) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(typeAndData))
  return Buffer.concat([length, typeAndData, crc])
}

function encodePng(size, pixels) {
  const header = Buffer.alloc(13)
  header.writeUInt32BE(size, 0)
  header.writeUInt32BE(size, 4)
  header[8] = 8 // 8 bitów na kanał
  header[9] = 6 // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(pixels, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

const ICONS = [
  { file: 'pwa-192x192.png', size: 192, rounded: true, maskable: false },
  { file: 'pwa-512x512.png', size: 512, rounded: true, maskable: false },
  { file: 'maskable-icon-512x512.png', size: 512, rounded: false, maskable: true },
  // iOS sam zaokrągla rogi ikon na ekranie głównym, więc tło ma być pełne.
  { file: 'apple-touch-icon.png', size: 180, rounded: false, maskable: false },
]

for (const { file, size, ...options } of ICONS) {
  writeFileSync(new URL(`../public/${file}`, import.meta.url), render(size, options))
  console.log(`public/${file}`)
}
