import { motion } from 'framer-motion'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import ArtPiece from '../components/ArtPiece'
import heroArt from '../assets/art/hero.png'
import grid3 from '../assets/art/grid-3.png'
import grid6 from '../assets/art/grid-6.png'
import grid8 from '../assets/art/grid-8.png'

const PHASES = [
  {
    id: '01',
    name: 'GENESIS_CORE',
    status: 'ACTIVE',
    art: heroArt,
    artName: 'genesis unit',
    summary:
      'The bedrock of the VOID protocol — initial program deployment on Solana, oracle integration, and the closed TERMINAL beta for core contributors.',
    items: [
      'Deployment of initial Solana program infrastructure.',
      'VOID protocol integration with decentralized oracle networks.',
      'Launch of the TERMINAL beta for core contributors.',
    ],
  },
  {
    id: '02',
    name: 'PUBLIC_MINT',
    status: 'LOCKED',
    art: grid3,
    artName: 'lattice',
    summary:
      'Full public mint opens. All 10,000 sequential units become available, followed by secondary marketplace listings and holder-only access.',
    items: [
      'Full public mint of all 10,000 sequential units.',
      'Secondary marketplace listings (Magic Eden, Tensor).',
      'Holder-only Discord channel unlock.',
    ],
  },
  {
    id: '03',
    name: 'EXPANSION_LAYER',
    status: 'LOCKED',
    art: grid8,
    artName: 'orbit',
    summary:
      'The collection grows past the mint. Free derivative drops, artist collaborations, and an on-chain rarity system for holders.',
    items: [
      'Free derivative mint for holders ("Expansion Pack 01").',
      'Collaborations with monochrome-aligned artists.',
      'On-chain rarity/grade scoring system goes live.',
    ],
  },
  {
    id: '04',
    name: 'PROTOCOL_DAO',
    status: 'LOCKED',
    art: grid6,
    artName: 'vector',
    summary:
      'Governance hands off to the holders. Treasury control, community-voted roadmap items, and the first IRL meetups.',
    items: [
      'Treasury handover to holder-governed DAO.',
      'Community-voted roadmap items for Phase 05.',
      'IRL meetup series in major cities.',
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Roadmap() {
  useDocumentMeta(
    'VOID Roadmap — Genesis to Protocol DAO',
    'Four phases from genesis contract deployment through public mint, an expansion layer, and handover to a holder-governed DAO.'
  )

  return (
    <>
      <section className="min-h-[80vh] flex items-center justify-center border-b border-primary px-6 md:px-margin-edge relative overflow-hidden">
        <div className="absolute inset-0 dither-bg" />
        <div className="max-w-4xl text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="font-mono text-label-mono-sm tracking-[0.4em] mb-8 uppercase text-outline"
          >
            [ INITIATING ROADMAP SEQUENCE ]
          </motion.p>
          <h1 className="font-display text-display-2xl text-[13vw] md:text-display-2xl tracking-tighter leading-none mb-12 uppercase">
            The
            <br />
            Progression
          </h1>
          <div className="flex justify-center gap-8 md:gap-12 font-mono">
            <div className="text-left border-l border-primary pl-4">
              <span className="block text-label-mono-sm text-outline uppercase">Phases</span>
              <span className="text-system-mono text-primary">{PHASES.length.toString().padStart(2, '0')}</span>
            </div>
            <div className="text-left border-l border-primary pl-4">
              <span className="block text-label-mono-sm text-outline uppercase">Active</span>
              <span className="text-system-mono text-primary">
                {PHASES.filter((p) => p.status === 'ACTIVE').length.toString().padStart(2, '0')}
              </span>
            </div>
            <div className="text-left border-l border-primary pl-4">
              <span className="block text-label-mono-sm text-outline uppercase">Locked</span>
              <span className="text-system-mono text-primary">
                {PHASES.filter((p) => p.status === 'LOCKED').length.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {PHASES.map((phase, idx) => {
        const reversed = idx % 2 === 1
        const isLocked = phase.status === 'LOCKED'

        return (
          <section
            key={phase.id}
            className={`min-h-screen grid grid-cols-1 md:grid-cols-12 border-b border-primary ${
              isLocked ? 'bg-surface' : ''
            }`}
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              className={`md:col-span-7 p-6 md:p-margin-edge flex flex-col justify-center ${
                reversed ? 'md:order-2 md:border-l' : 'md:border-r'
              } border-primary`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`status-led ${isLocked ? 'status-led-inactive' : 'status-led-active'}`}
                  style={!isLocked ? { animation: 'pulse 2s infinite' } : undefined}
                />
                <span className="font-mono text-label-mono-sm uppercase text-outline">[ {phase.status} ]</span>
              </div>
              <h2
                className={`font-display text-display-lg-mobile md:text-display-lg tracking-tighter mb-6 uppercase ${
                  isLocked ? 'opacity-30' : ''
                }`}
              >
                PHASE_{phase.id}
              </h2>
              <h3 className="font-display text-headline-md mb-6 uppercase">{phase.name.replace('_', ' ')}</h3>
              <p className="font-display text-body-lg text-outline max-w-xl mb-10 leading-relaxed">
                {phase.summary}
              </p>
              <ul className="space-y-3 font-mono text-system-mono text-on-background">
                {phase.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-primary">
                      {phase.id}.{i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className={`md:col-span-5 relative min-h-[40vh] md:min-h-0 ${reversed ? 'md:order-1' : ''}`}
            >
              <ArtPiece
                src={phase.art}
                alt={`VOID roadmap phase ${phase.id} — ${phase.artName} composition`}
                className={isLocked ? 'opacity-50' : ''}
              />
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/40">
                  <span className="font-mono text-system-mono uppercase tracking-[0.3em] border border-primary px-4 py-2 bg-background">
                    Access Locked
                  </span>
                </div>
              )}
            </motion.div>
          </section>
        )
      })}
    </>
  )
}
