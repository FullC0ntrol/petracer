/*
  Wstawia do planu HTML cały kod projektu z wyjaśnieniami.
  Uruchomienie z folderu petracer:  node plan/przewodnik/build.mjs

  Kod pochodzi wprost z plików, więc nie ma w nim literówek. Wyjaśnienia są w plikach *.txt obok:
    @@ ścieżka       początek pliku
    > tekst          krótki opis całego pliku
    @20 początek     fragment od linii zaczynającej się tym tekstem, przepisywany w sesji 20
    tekst            wyjaśnienie fragmentu

  Sesja 0 oznacza kod z sesji 1–16, a 99 kod, którego się nie przepisuje.
  Skrypt przerywa pracę, gdy fragment nie pasuje do pliku albo plik został bez wyjaśnienia.
*/
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, extname, join, basename } from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, '..', '..')
const PLAN = join(ROOT, 'plan', 'PeTrace — plan przepisywania.html')
const USER_CLIENT = 'C:/Users/macie/Website/PeTracker-FinalVersion/petracer-final'
const START = '<!-- KOD:START -->'
const END = '<!-- KOD:END -->'

const problems = []
const read = (path) => readFileSync(path, 'utf8').replace(/\r\n/g, '\n')

function parseGuide(text, source) {
  const files = []
  let file = null
  let chunk = null
  for (const line of text.split('\n')) {
    const header = line.match(/^@@ (.+)$/)
    const start = line.match(/^@(\d+) (.+)$/)
    if (header) {
      file = { path: header[1].trim(), intro: '', parts: [] }
      files.push(file)
      chunk = null
    } else if (start) {
      if (!file) throw new Error(`${source}: fragment poza plikiem: ${line}`)
      chunk = { s: Number(start[1]), anchor: start[2].trim(), note: [] }
      file.parts.push(chunk)
    } else if (line.startsWith('> ') && file && !chunk) {
      file.intro += (file.intro ? ' ' : '') + line.slice(2).trim()
    } else if (chunk) {
      chunk.note.push(line)
    }
  }
  return files
}

function findLine(lines, anchor, from) {
  if (anchor === '^') return 0
  const nth = anchor.match(/^(\d+)\*(.+)$/)
  let skip = nth ? Number(nth[1]) - 1 : 0
  const wanted = nth ? nth[2] : anchor
  const exact = wanted.startsWith('=')
  for (let index = from; index < lines.length; index++) {
    const line = lines[index].trim()
    if (exact ? line === wanted.slice(1) : line.startsWith(wanted)) {
      if (skip === 0) return index
      skip -= 1
    }
  }
  return -1
}

function language(path) {
  const name = basename(path)
  const extension = extname(path)
  if (['.js', '.jsx', '.mjs'].includes(extension)) return 'javascript'
  if (extension === '.css') return 'css'
  if (extension === '.sql') return 'sql'
  if (extension === '.json') return 'json'
  if (extension === '.html') return 'xml'
  if (extension === '.yml') return 'yaml'
  // Dockerfile, Caddyfile i pliki ignore: komentarze z # kolorują się tak samo jak w powłoce.
  if (['Dockerfile', 'Caddyfile', '.gitignore', '.dockerignore'].includes(name)) return 'bash'
  if (name.startsWith('.env')) return 'ini'
  return 'plaintext'
}

// Tam, gdzie leży plik w Twoim repozytorium: frontend w client/, serwer w server/, Compose w korzeniu.
function repoPath(path) {
  if (path.startsWith('server/') || path.startsWith('docker-compose') || path === '.env.example') return path
  return 'client/' + path
}

function userStatus(path, text) {
  if (path.startsWith('server/') || path.startsWith('docker-compose') || path === '.env.example') return 'new'
  const mine = join(USER_CLIENT, path)
  if (!existsSync(mine)) return 'new'
  return read(mine).trim() === text.trim() ? 'same' : 'differs'
}

const guides = readdirSync(HERE).filter((name) => name.endsWith('.txt')).sort()
const parsed = guides.flatMap((name) => parseGuide(read(join(HERE, name)), name))

const output = parsed.map((file) => {
  const absolute = join(ROOT, file.path)
  if (!existsSync(absolute)) {
    problems.push(`Brak pliku: ${file.path}`)
    return null
  }
  const text = read(absolute).replace(/\n$/, '')
  const lines = text.split('\n')
  if (!file.intro) problems.push(`${file.path}: brak opisu pliku`)

  let previous = -1
  const starts = file.parts.map((part) => {
    const at = findLine(lines, part.anchor, previous + 1)
    if (at < 0) problems.push(`${file.path}: nie znaleziono „${part.anchor}” po linii ${previous + 1}`)
    else previous = at
    return at
  })
  if (starts[0] !== 0) problems.push(`${file.path}: pierwszy fragment nie zaczyna się od pierwszej linii`)

  const chunks = file.parts.map((part, index) => {
    const start = starts[index]
    let end = (index + 1 < starts.length ? starts[index + 1] : lines.length) - 1
    while (end > start && !lines[end].trim()) end -= 1
    const note = part.note.join('\n').trim()
    const size = lines.slice(start, end + 1).filter((line) => line.trim()).length
    if (!note && size > 2) problems.push(`${file.path}: fragment „${part.anchor}” (${size} linii) nie ma wyjaśnienia`)
    return { s: part.s, a: start + 1, b: end + 1, n: note }
  })

  return {
    path: file.path,
    repo: repoPath(file.path),
    lang: language(file.path),
    status: userStatus(file.path, text),
    intro: file.intro,
    text,
    chunks,
  }
}).filter(Boolean)

// Czy każdy plik projektu ma swoje miejsce w przewodniku.
const tracked = execFileSync('git', ['ls-files', '-co', '--exclude-standard'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n')
  .filter((path) => path && existsSync(join(ROOT, path)))
  .filter((path) => !/^plan\/|^public\/|package-lock\.json$|\.md$|^\.vscode\//.test(path))
const known = new Set(output.map((file) => file.path))
for (const path of tracked) if (!known.has(path)) problems.push(`Plik bez wyjaśnienia: ${path}`)

const html = read(PLAN)

// Czy kroki planu wskazują fragmenty przypisane do tej samej sesji.
const sessionRe = /\bn: (\d+), part: '[A-Z]'/g
const marks = [...html.matchAll(sessionRe)].map((match) => ({ n: Number(match[1]), at: match.index }))
marks.forEach((mark, index) => {
  const body = html.slice(mark.at, index + 1 < marks.length ? marks[index + 1].at : undefined)
  const stepsMatch = body.match(/steps: \[([\s\S]*?)\n    \],/)
  if (!stepsMatch) return
  for (const link of stepsMatch[1].matchAll(/\[\[(.+?)\]\]/g)) {
    const path = link[1]
    if (path === 'DEPLOY.md' || path.startsWith('plan/')) continue
    const entry = output.find((file) => file.path === path)
    if (!entry) problems.push(`Sesja ${mark.n}: krok wskazuje nieznany plik ${path}`)
    else if (!entry.chunks.some((chunk) => chunk.s === mark.n)) {
      problems.push(`Sesja ${mark.n}: krok wskazuje ${path}, ale ten plik nie ma fragmentu z tej sesji`)
    }
  }
})

if (problems.length) {
  console.error(`Przewodnik ma ${problems.length} problemów:\n` + problems.map((item) => ' - ' + item).join('\n'))
  process.exit(1)
}

if (!html.includes(START) || !html.includes(END)) throw new Error('W planie nie ma znaczników KOD:START i KOD:END.')
// `<` zapisane kodem, żeby `</script>` i `<!--` z kodu nie zamknęły bloku z danymi.
const json = JSON.stringify(output).replace(/</g, '\\u003c').replace(/\u2028|\u2029/g, ' ')
const block = `${START}\n<script type="application/json" id="code-data">${json}</script>\n${END}`
const updated = html.slice(0, html.indexOf(START)) + block + html.slice(html.indexOf(END) + END.length)
writeFileSync(PLAN, updated)

const totalLines = output.reduce((sum, file) => sum + file.text.split('\n').length, 0)
const chunkCount = output.reduce((sum, file) => sum + file.chunks.length, 0)
console.log(`Gotowe: ${output.length} plików, ${totalLines} linii kodu, ${chunkCount} fragmentów, plan ma ${Math.round(Buffer.byteLength(updated) / 1024)} KB.`)
