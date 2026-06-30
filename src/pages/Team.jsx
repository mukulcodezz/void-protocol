import { motion } from 'framer-motion'
import PlaceholderArt from '../components/PlaceholderArt'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const TEAM = [
  { id: '01', name: 'CHARLOTTE_VOX', role: 'FOUNDER / PROTOCOL_LEAD' },
  { id: '02', name: 'MARCUS_GREY', role: 'CREATIVE_DIRECTOR' },
  { id: '03', name: 'ILA_NOVAK', role: 'SMART_CONTRACT_ENGINEER' },
  { id: '04', name: 'DESH_KIRA', role: 'COMMUNITY_OPS' },
  { id: '05', name: 'RAVEN_OST', role: 'GENERATIVE_ARTIST' },
  { id: '06', name: 'TOBIAS_LIN', role: 'BRAND_DESIGN' },
]

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const cardItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export default function Team() {
  useDocumentMeta(
    'VOID Team — Protocol Contributors',
    'Meet the founder, engineers, and artists building the VOID protocol.'
  )

  return (
    <>
      <header className="border-b border-primary px-6 md:px-margin-edge py-16 relative overflow-hidden">
        <div className="absolute inset-0 dither-bg" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="font-mono text-system-mono text-outline mb-2 block uppercase">
              System Archive / Contributors
            </span>
            <h1 className="font-display text-display-2xl text-[14vw] md:text-display-2xl uppercase">Team</h1>
          </div>
          <div className="text-left md:text-right font-mono text-label-mono-sm text-outline">
            HEADCOUNT: {TEAM.length.toString().padStart(2, '0')}
            <br />
            STATUS: FULLY_STAFFED
          </div>
        </div>
      </header>

      <motion.section
        variants={gridContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-3"
      >
        {TEAM.map((member, i) => (
          <motion.div
            key={member.id}
            variants={cardItem}
            whileHover={{ boxShadow: 'inset 0 0 0 2px #ffffff' }}
            transition={{ duration: 0.15 }}
            className={`border-b border-primary p-6 md:p-8 flex flex-col gap-6 ${
              (i + 1) % 3 !== 0 ? 'md:border-r' : ''
            }`}
          >
            <div className="aspect-square border border-primary">
              <PlaceholderArt label={member.id} />
            </div>
            <div>
              <h3 className="font-mono text-system-mono uppercase">{member.name}</h3>
              <p className="font-mono text-label-mono-sm text-outline uppercase mt-1">{member.role}</p>
            </div>
            <div className="flex gap-3 font-mono text-label-mono-sm uppercase">
              <motion.a
                whileTap={{ scale: 0.95 }}
                href="#"
                className="border border-primary px-3 py-1 hover:bg-primary hover:text-background"
              >
                X
              </motion.a>
              <motion.a
                whileTap={{ scale: 0.95 }}
                href="#"
                className="border border-primary px-3 py-1 hover:bg-primary hover:text-background"
              >
                DISCORD
              </motion.a>
            </div>
          </motion.div>
        ))}
      </motion.section>
    </>
  )
}
