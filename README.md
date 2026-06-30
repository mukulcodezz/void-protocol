# VOID

Monochrome generative NFT collection site — 10,000 units, strict black & white, terminal/blueprint aesthetic.

## Stack

- React 19 + Vite
- React Router (client-side routing)
- Tailwind CSS
- Framer Motion (page transitions, scroll reveals, micro-interactions)
- Browser wallet connect (`window.ethereum`, no backend)

## Pages

| Route | Description |
|---|---|
| `/` | Hero, 3x3 art grid, philosophy section, stat strip |
| `/mint` | Mint widget — quantity stepper, live log feed, simulated mint flow |
| `/roadmap` | Full-screen sequential phase reveal (genesis → public mint → expansion → DAO) |
| `/team` | Contributor grid |
| `/faq` | Accordion FAQ with FAQPage JSON-LD schema |

## Development

```bash
npm install
npm run dev      # start dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Art generation

Line-art pieces in `src/assets/art/` were generated programmatically (SVG + Playwright screenshot) rather than hand-drawn or AI-image-generated. Regenerate or extend the set with:

```bash
node scripts/gen-art.mjs
```

See `src/assets/art/STRUCTURAL-SILENCE.md` for the visual design philosophy behind the piece set.

## Notes

- This is a client-rendered SPA. Per-route `<title>`/meta tags update at runtime (`src/hooks/useDocumentMeta.js`), which Google indexes fine via JS rendering, but non-JS social-card unfurlers will only see the homepage's static OG tags. Add prerendering if per-route social cards matter later.
- No smart contract is deployed yet — `/mint` is a UI simulation. Wallet connect is real (`window.ethereum`); the mint transaction itself is not.
