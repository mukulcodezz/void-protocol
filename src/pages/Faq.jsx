import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const FAQS = [
  {
    q: 'What is VOID?',
    a: 'VOID is a 10,000-unit generative NFT collection built around strict monochrome design — pure black and white, no color, no decoration beyond structure.',
  },
  {
    q: 'How much does it cost to mint?',
    a: 'Each unit mints for 0.08 ETH, plus gas. You can mint up to 10 units per transaction.',
  },
  {
    q: 'What blockchain is VOID on?',
    a: 'VOID is deployed on Ethereum. You will need a browser wallet such as MetaMask to connect and mint.',
  },
  {
    q: 'Do I need a wallet to browse the site?',
    a: 'No — you can browse Home, Roadmap, Team, and this FAQ without connecting. A wallet is only required to mint.',
  },
  {
    q: 'What do holders get?',
    a: 'Holders get access to the protocol Discord, voting rights in the future DAO, and eligibility for free expansion-pack mints in later phases.',
  },
  {
    q: "What's the roadmap?",
    a: 'Genesis deployment, public mint, an expansion layer of derivative drops, and a handover to a holder-governed DAO. Full detail on the Roadmap page.',
  },
]

export default function Faq() {
  useDocumentMeta(
    'VOID FAQ — Minting, Pricing, Holder Benefits',
    'Answers on VOID mint price, blockchain, wallet requirements, and what holders get.'
  )
  const [openIndex, setOpenIndex] = useState(0)

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    })
    document.head.appendChild(script)
    return () => document.head.removeChild(script)
  }, [])

  return (
    <>
      <header className="border-b border-primary px-6 md:px-margin-edge py-16 relative overflow-hidden">
        <div className="absolute inset-0 dither-bg" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="font-mono text-system-mono text-outline mb-2 block uppercase">
              System Archive / Support
            </span>
            <h1 className="font-display text-display-2xl text-[14vw] md:text-display-2xl uppercase">FAQ</h1>
          </div>
          <div className="text-left md:text-right font-mono text-label-mono-sm text-outline">
            ENTRIES: {FAQS.length.toString().padStart(2, '0')}
            <br />
            LAST_SYNC: GENESIS
          </div>
        </div>
      </header>

      <section className="px-6 md:px-margin-edge py-16 max-w-3xl mx-auto">
        <dl className="flex flex-col">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div key={item.q} layout className="border-b border-primary">
                <dt>
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="w-full flex justify-between items-center gap-6 py-6 text-left font-mono text-system-mono uppercase hover:text-primary transition-colors"
                  >
                    <span>{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="font-mono text-primary shrink-0 text-lg"
                    >
                      +
                    </motion.span>
                  </button>
                </dt>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.dd
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 font-display text-body-lg text-outline leading-relaxed">{item.a}</p>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </dl>
      </section>
    </>
  )
}
