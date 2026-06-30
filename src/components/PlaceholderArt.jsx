const GLYPHS = ['◇', '◈', '◆', '▣']

function seedFromLabel(label = '') {
  let sum = 0
  for (let i = 0; i < label.length; i++) sum += label.charCodeAt(i)
  return sum
}

export default function PlaceholderArt({ label, className = '' }) {
  const seed = seedFromLabel(label)
  const glyph = GLYPHS[seed % GLYPHS.length]
  const rotation = (seed % 5) * 9 - 18 // -18deg..+18deg, deterministic per label
  const opacity = 0.2 + ((seed % 4) * 0.05) // 0.20–0.35, deterministic per label

  return (
    <div className={`placeholder-art w-full h-full flex items-center justify-center relative ${className}`}>
      <span
        className="text-primary text-5xl select-none"
        style={{ opacity, transform: `rotate(${rotation}deg)` }}
        aria-hidden="true"
      >
        {glyph}
      </span>
      {label && (
        <div className="absolute top-0 right-0 bg-background border-l border-b border-primary px-3 py-1 font-mono text-system-mono">
          {label}
        </div>
      )}
    </div>
  )
}
