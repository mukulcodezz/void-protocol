import { chromium } from 'playwright'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fontsDir = 'C:/Users/rajni/.claude/skills/canvas-design/canvas-fonts'
const outDir = path.join(__dirname, '../src/assets/art')

function fontDataUri(file) {
  const buf = fs.readFileSync(path.join(fontsDir, file))
  return `data:font/ttf;base64,${buf.toString('base64')}`
}

const displayFontUri = fontDataUri('BricolageGrotesque-Bold.ttf')
const monoFontUri = fontDataUri('JetBrainsMono-Regular.ttf')

const baseStyle = `
  @font-face { font-family: 'Display'; src: url('${displayFontUri}'); }
  @font-face { font-family: 'Mono'; src: url('${monoFontUri}'); }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#0c0c0c; width:1024px; height:1024px; position:relative; overflow:hidden; }
  .frame { position:absolute; inset:32px; border:1px solid #ffffff; }
  .label-bl { position:absolute; left:56px; bottom:48px; font-family:'Mono'; color:#ffffff; font-size:14px; letter-spacing:2px; text-transform:uppercase; }
  .label-tr { position:absolute; right:56px; top:48px; font-family:'Mono'; color:#9a9a9a; font-size:13px; letter-spacing:1px; text-align:right; line-height:1.6; }
  svg { position:absolute; inset:0; }
  .dot { fill:#ffffff; }
`

function wrap(svgInner) {
  return `<!doctype html><html><head><meta charset="utf-8"/><style>${baseStyle}</style></head>
  <body>
    <svg width="1024" height="1024" viewBox="0 0 1024 1024">${svgInner}</svg>
  </body></html>`
}

function ditherPattern(id, x, y, w, h, spacing = 6) {
  let dots = ''
  for (let py = y; py < y + h; py += spacing) {
    for (let px = x; px < x + w; px += spacing) {
      dots += `<circle cx="${px}" cy="${py}" r="0.6" fill="#ffffff" opacity="0.5"/>`
    }
  }
  return dots
}

const pieces = []

// FIG.01 — MONOLITH
pieces.push({
  name: 'grid-1',
  labelBL: 'FIG.01 — MONOLITH',
  labelTR: 'Δ 0.01<br/>H:W 1.618',
  svg: `
    <rect x="452" y="220" width="120" height="600" fill="none" stroke="#ffffff" stroke-width="1.5"/>
    ${[0,1,2,3,4,5,6,7,8,9,10].map(i => `<line x1="430" y1="${220 + i * 60}" x2="452" y2="${220 + i * 60}" stroke="#ffffff" stroke-width="1"/>`).join('')}
    ${ditherPattern('d1', 452, 822, 120, 60, 5)}
  `,
})

// FIG.02 — PYRAMID
pieces.push({
  name: 'grid-2',
  labelBL: 'FIG.02 — PYRAMID',
  labelTR: 'Δ 0.02<br/>BASE 520',
  svg: `
    <polygon points="512,260 772,760 252,760" fill="none" stroke="#ffffff" stroke-width="1.5"/>
    <line x1="512" y1="260" x2="512" y2="760" stroke="#ffffff" stroke-width="1"/>
    <line x1="382" y1="510" x2="642" y2="510" stroke="#ffffff" stroke-width="1"/>
    <circle cx="512" cy="260" r="4" fill="#ffffff"/>
  `,
})

// FIG.03 — LATTICE
pieces.push({
  name: 'grid-3',
  labelBL: 'FIG.03 — LATTICE',
  labelTR: 'Δ 0.03<br/>CELLS 8x8',
  svg: `
    ${Array.from({ length: 9 }, (_, i) => `<line x1="${220 + i * 73.5}" y1="220" x2="${220 + i * 73.5}" y2="804" stroke="#ffffff" stroke-width="0.75" opacity="0.6"/>`).join('')}
    ${Array.from({ length: 9 }, (_, i) => `<line x1="220" y1="${220 + i * 73.5}" x2="804" y2="${220 + i * 73.5}" stroke="#ffffff" stroke-width="0.75" opacity="0.6"/>`).join('')}
    <line x1="220" y1="220" x2="804" y2="804" stroke="#ffffff" stroke-width="1.5"/>
    <line x1="293.5" y1="220" x2="804" y2="730.5" stroke="#ffffff" stroke-width="1.5"/>
    <line x1="220" y1="293.5" x2="730.5" y2="804" stroke="#ffffff" stroke-width="1.5"/>
  `,
})

// FIG.04 — APERTURE
pieces.push({
  name: 'grid-4',
  labelBL: 'FIG.04 — APERTURE',
  labelTR: 'Δ 0.04<br/>R 260',
  svg: `
    <circle cx="512" cy="512" r="260" fill="none" stroke="#ffffff" stroke-width="1.5"/>
    <circle cx="512" cy="512" r="2" fill="#ffffff"/>
    ${Array.from({ length: 24 }, (_, i) => {
      const a = (i / 24) * Math.PI * 2
      const r1 = 260
      const r2 = i % 6 === 0 ? 290 : 272
      const x1 = 512 + Math.cos(a) * r1
      const y1 = 512 + Math.sin(a) * r1
      const x2 = 512 + Math.cos(a) * r2
      const y2 = 512 + Math.sin(a) * r2
      return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#ffffff" stroke-width="1"/>`
    }).join('')}
  `,
})

// FIG.05 — STRATA
pieces.push({
  name: 'grid-5',
  labelBL: 'FIG.05 — STRATA',
  labelTR: 'Δ 0.05<br/>BANDS 6',
  svg: `
    ${[0, 100, 175, 280, 380, 520, 650].map((y, i, arr) => {
      if (i === arr.length - 1) return ''
      const h = arr[i + 1] - y
      const filled = i % 2 === 0
      return `<rect x="220" y="${220 + y}" width="584" height="${h}" fill="${filled ? 'none' : 'none'}" stroke="#ffffff" stroke-width="1"/>` +
        (filled ? ditherPattern(`s${i}`, 220, 220 + y, 584, h, 8) : '')
    }).join('')}
  `,
})

// FIG.06 — VECTOR
pieces.push({
  name: 'grid-6',
  labelBL: 'FIG.06 — VECTOR',
  labelTR: 'Δ 0.06<br/>VP 512,512',
  svg: `
    <line x1="220" y1="220" x2="512" y2="512" stroke="#ffffff" stroke-width="1"/>
    <line x1="804" y1="220" x2="512" y2="512" stroke="#ffffff" stroke-width="1"/>
    <line x1="220" y1="804" x2="512" y2="512" stroke="#ffffff" stroke-width="1"/>
    <line x1="804" y1="804" x2="512" y2="512" stroke="#ffffff" stroke-width="1"/>
    <rect x="220" y="220" width="584" height="584" fill="none" stroke="#ffffff" stroke-width="1.5"/>
    <circle cx="512" cy="512" r="5" fill="#ffffff"/>
  `,
})

// FIG.07 — FRACTURE
pieces.push({
  name: 'grid-7',
  labelBL: 'FIG.07 — FRACTURE',
  labelTR: 'Δ 0.07<br/>N 11',
  svg: `
    <polygon points="512,230 650,400 580,560" fill="none" stroke="#ffffff" stroke-width="1"/>
    <polygon points="650,400 760,480 580,560" fill="none" stroke="#ffffff" stroke-width="1"/>
    <polygon points="580,560 760,480 700,700" fill="none" stroke="#ffffff" stroke-width="1"/>
    <polygon points="512,230 580,560 380,500" fill="none" stroke="#ffffff" stroke-width="1"/>
    <polygon points="380,500 580,560 420,720" fill="none" stroke="#ffffff" stroke-width="1"/>
    <polygon points="420,720 580,560 700,700" fill="none" stroke="#ffffff" stroke-width="1"/>
    <polygon points="380,500 420,720 280,640" fill="none" stroke="#ffffff" stroke-width="1"/>
  `,
})

// FIG.08 — ORBIT
pieces.push({
  name: 'grid-8',
  labelBL: 'FIG.08 — ORBIT',
  labelTR: 'Δ 0.08<br/>RINGS 4',
  svg: `
    ${[80, 150, 220, 290].map((r) => `<circle cx="512" cy="512" r="${r}" fill="none" stroke="#ffffff" stroke-width="1" opacity="${r === 220 ? 1 : 0.5}"/>`).join('')}
    <circle cx="${512 + 220}" cy="512" r="6" fill="#ffffff"/>
    <line x1="512" y1="512" x2="${512 + 220}" y2="512" stroke="#ffffff" stroke-width="0.75" opacity="0.5"/>
  `,
})

// FIG.09 — GRID_FIELD
pieces.push({
  name: 'grid-9',
  labelBL: 'FIG.09 — GRID_FIELD',
  labelTR: 'Δ 0.09<br/>VOID CUT',
  svg: `
    ${ditherPattern('gf', 220, 220, 584, 584, 9)}
    <rect x="430" y="430" width="164" height="164" fill="#0c0c0c" stroke="#ffffff" stroke-width="1.5"/>
  `,
})

await build()

async function build() {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } })

  for (const piece of pieces) {
    await page.setContent(wrap(piece.svg))
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(150)
    await page.screenshot({ path: path.join(outDir, `${piece.name}.png`) })
    console.log('rendered', piece.name)
  }

  // HERO — taller canvas, combined motifs
  const heroStyle = baseStyle.replace('width:1024px; height:1024px;', 'width:1024px; height:1280px;')
  const heroHtml = `<!doctype html><html><head><meta charset="utf-8"/><style>${heroStyle}</style></head>
  <body>
    <svg width="1024" height="1280" viewBox="0 0 1024 1280">
      <circle cx="512" cy="560" r="320" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.4"/>
      <rect x="462" y="260" width="100" height="600" fill="none" stroke="#ffffff" stroke-width="1.5"/>
      ${Array.from({ length: 11 }, (_, i) => `<line x1="440" y1="${260 + i * 60}" x2="462" y2="${260 + i * 60}" stroke="#ffffff" stroke-width="1"/>`).join('')}
      ${ditherPattern('hero', 462, 832, 100, 28, 5)}
      ${Array.from({ length: 32 }, (_, i) => {
        const a = (i / 32) * Math.PI * 2
        const r1 = 320
        const r2 = i % 8 === 0 ? 350 : 332
        const x1 = 512 + Math.cos(a) * r1
        const y1 = 560 + Math.sin(a) * r1
        const x2 = 512 + Math.cos(a) * r2
        const y2 = 560 + Math.sin(a) * r2
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#ffffff" stroke-width="1" opacity="0.6"/>`
      }).join('')}
    </svg>
  </body></html>`
  await page.setContent(heroHtml)
  await page.setViewportSize({ width: 1024, height: 1280 })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(150)
  await page.screenshot({ path: path.join(outDir, 'hero.png') })
  console.log('rendered hero')

  await browser.close()
}
