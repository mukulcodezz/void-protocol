import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ArtPiece from '../components/ArtPiece'
import { PRICE_ETH, TOTAL_SUPPLY } from '../constants'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import heroArt from '../assets/art/hero.png'
import grid1 from '../assets/art/grid-1.png'
import grid2 from '../assets/art/grid-2.png'
import grid3 from '../assets/art/grid-3.png'
import grid4 from '../assets/art/grid-4.png'
import grid5 from '../assets/art/grid-5.png'
import grid6 from '../assets/art/grid-6.png'
import grid7 from '../assets/art/grid-7.png'
import grid8 from '../assets/art/grid-8.png'
import grid9 from '../assets/art/grid-9.png'

const GRID_NAMES = [
  'MONOLITH',
  'PYRAMID',
  'LATTICE',
  'APERTURE',
  'STRATA',
  'VECTOR',
  'FRACTURE',
  'ORBIT',
  'GRID_FIELD',
]
const GRID_IMAGES = [grid1, grid2, grid3, grid4, grid5, grid6, grid7, grid8, grid9]
const GRID_ITEMS = GRID_IMAGES.map((src, i) => ({
  src,
  id: `V_${String(i + 1).padStart(3, '0')}`,
  name: GRID_NAMES[i],
}))

const STATS = [
  { value: '10K', label: 'Supply' },
  { value: `${PRICE_ETH}`, label: 'ETH Price' },
  { value: '01', label: 'Phase' },
  { value: 'ERC-721', label: 'Standard' },
]

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const heroItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const gridItem = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Home() {
  useDocumentMeta(
    'VOID — A Monochrome NFT Protocol',
    'VOID is a 10,000-unit generative NFT collection built on architectural silence. Pure black and white, zero color, zero decoration beyond structure.'
  )

  return (
    <>
      <section className="grid grid-cols-12 min-h-[80vh] border-b border-primary">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="col-span-12 md:col-span-8 flex flex-col justify-end p-6 md:p-margin-edge border-r border-primary relative overflow-hidden"
        >
          <div className="hidden md:block absolute top-8 right-8 font-mono text-label-mono-sm text-outline text-right">
            COLLECTION_SIZE // {TOTAL_SUPPLY.toLocaleString()} UNITS
            <br />
            STANDARD // ERC-721
          </div>
          <motion.h1
            variants={heroItem}
            className="font-display text-display-2xl tracking-[-0.05em] leading-none mb-4 text-[15vw] md:text-display-2xl"
          >
            VOID
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="font-mono text-system-mono uppercase tracking-[0.2em] text-outline mb-12"
          >
            Architectural silence in the digital sprawl.
          </motion.p>
          <motion.div variants={heroItem} className="flex flex-wrap items-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/mint"
                className="relative block px-12 py-5 border border-primary bg-background hover:bg-primary hover:text-background transition-colors duration-75 font-mono text-system-mono uppercase font-bold"
              >
                MINT_PROTOCOL
              </Link>
            </motion.div>
            <div className="font-mono text-label-mono-sm text-outline uppercase max-w-[200px]">
              Available supply limited to {TOTAL_SUPPLY.toLocaleString()} sequential units.
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="col-span-12 md:col-span-4 bg-surface-container-lowest relative"
        >
          <ArtPiece src={heroArt} alt="VOID genesis unit — architectural line art on black" label="SYS.INIT_001" />
          <div className="absolute bottom-0 left-0 p-4 border-r border-t border-primary font-mono text-label-mono-sm">
            00 // STATUS_IDLE
          </div>
        </motion.div>
      </section>

      <section className="border-b border-primary">
        <div className="px-6 md:px-margin-edge py-12 border-b border-primary flex justify-between items-end">
          <h2 className="font-display text-headline-md uppercase">ARCHIVE_EXHIBIT</h2>
          <div className="font-mono text-system-mono text-outline hidden md:block">GRID_REF // 3x3_MATRIX</div>
        </div>
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3"
        >
          {GRID_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              variants={gridItem}
              whileHover={{ boxShadow: 'inset 0 0 0 2px #ffffff' }}
              transition={{ duration: 0.15 }}
              className={`aspect-square relative ${i % 3 !== 2 ? 'md:border-r' : ''} border-b border-primary`}
            >
              <ArtPiece src={item.src} alt={`VOID archive piece — ${item.name.toLowerCase()} composition`} label={item.id} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-12 border-b border-primary">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="md:col-span-6 p-6 md:p-margin-edge border-r border-primary"
        >
          <div className="mb-12 font-mono text-label-mono-sm text-outline">SEC_01 // THE_PHILOSOPHY</div>
          <h3 className="font-display text-display-lg-mobile md:text-display-lg mb-8 leading-tight">
            THE ARCHITECTURE OF SILENCE.
          </h3>
          <p className="font-display text-body-lg text-outline leading-relaxed max-w-md">
            VOID is not an experiment in aesthetics, but a mandate for clarity. In an era of visual noise, we
            prioritize the structural skeleton over the decorative skin.
            <br />
            <br />
            Every pixel is a coordinate. Every border is a boundary. We build for those who find beauty in the
            precision of a machine and the silence of a vacuum.
          </p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="md:col-span-6 p-6 md:p-margin-edge flex flex-col justify-between gap-12"
        >
          <div className="font-mono text-system-mono uppercase tracking-widest">
            01. REDUCE
            <br />
            02. REFINE
            <br />
            03. RELEASE
          </div>
          <div className="border border-primary p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full dither-bg" />
            <h4 className="font-mono text-system-mono mb-4 relative z-10">TECHNICAL_LOG</h4>
            <p className="font-mono text-system-mono text-outline relative z-10">
              &gt; INITIALIZING PROTOCOL_LAYER_0
              <br />
              &gt; SCANNING GRID_COORDINATES... DONE
              <br />
              &gt; ENFORCING MONO_SPACING... DONE
              <br />
              &gt; VOID_ESTABLISHED
            </p>
            <div className="mt-8 flex justify-end relative z-10">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/faq"
                  className="block px-6 py-2 bg-primary text-background font-mono text-system-mono uppercase hover:bg-background hover:text-primary border border-primary transition-colors"
                >
                  READ_DOCS
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ scale: 1.02 }}
            className={`p-8 flex flex-col justify-center items-center invert-on-hover transition-colors ${
              i !== STATS.length - 1 ? 'border-r border-primary' : ''
            }`}
          >
            <span className="font-display text-display-lg">{stat.value}</span>
            <span className="font-mono text-label-mono-sm uppercase text-outline">{stat.label}</span>
          </motion.div>
        ))}
      </section>
    </>
  )
}
