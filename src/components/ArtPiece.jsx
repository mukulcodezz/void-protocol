export default function ArtPiece({ src, alt, label, className = '' }) {
  return (
    <div className={`w-full h-full relative overflow-hidden bg-surface-container-lowest ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      {label && (
        <div className="absolute top-0 right-0 bg-background border-l border-b border-primary px-3 py-1 font-mono text-system-mono">
          {label}
        </div>
      )}
    </div>
  )
}
