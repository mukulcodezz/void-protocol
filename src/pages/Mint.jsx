import { useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ArtPiece from '../components/ArtPiece'
import { PRICE_SOL, TOTAL_SUPPLY } from '../constants'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import objectArt from '../assets/art/grid-4.png'

export default function Mint() {
  useDocumentMeta(
    `Mint VOID — ${PRICE_SOL} SOL per unit`,
    `Mint a VOID unit for ${PRICE_SOL} SOL. ${TOTAL_SUPPLY.toLocaleString()} sequential units total, connect your Solana wallet to begin.`
  )
  const wallet = useOutletContext()
  const [quantity, setQuantity] = useState(1)
  const [minted, setMinted] = useState(0)
  const [minting, setMinting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState(['> SYSTEM_BOOT_OK', '> READY_FOR_INPUT'])
  const logIntervalRef = useRef(null)

  useEffect(() => () => clearInterval(logIntervalRef.current), [])

  const addLog = (msg) => setLogs((prev) => [`> ${msg}`, ...prev].slice(0, 20))

  const handleQuantity = (delta) => {
    setQuantity((prev) => {
      const next = Math.min(10, Math.max(1, prev + delta))
      addLog(`QUANTITY_SET: ${next}`)
      return next
    })
  }

  const handleMint = () => {
    if (!wallet.address) {
      addLog('ERROR: CONNECT_WALLET_FIRST')
      return
    }
    setMinting(true)
    setProgress(0)
    addLog('INITIALIZING_SEQUENCE...')

    logIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + Math.floor(Math.random() * 15) + 5)
        if (next >= 100) {
          clearInterval(logIntervalRef.current)
          addLog('SUCCESS: UNIT_REGISTERED')
          setMinted((m) => m + quantity)
          setTimeout(() => {
            setMinting(false)
            setProgress(0)
          }, 800)
        }
        return next
      })
    }, 400)
  }

  return (
    <section className="flex flex-col md:flex-row min-h-[calc(100vh-6rem-1px)] relative">
      <div className="fixed inset-0 grid-bg pointer-events-none -z-10 opacity-20" />

      <aside className="w-full md:w-80 border-r border-b md:border-b-0 border-primary p-6 flex flex-col gap-6 relative overflow-hidden">
        <div className="dither-bg absolute inset-0 pointer-events-none" />
        <header className="flex justify-between items-start border-b border-primary pb-4 relative z-10">
          <div>
            <h2 className="font-mono text-primary uppercase">PROTOCOL_STAT</h2>
            <p className="font-mono text-label-mono-sm text-outline">PHASE: 01_GENESIS</p>
          </div>
        </header>
        <div className="space-y-4 relative z-10">
          <section>
            <label className="font-mono text-label-mono-sm text-outline block mb-2">// PROGRAM_ID</label>
            <div className="bg-surface-container border border-primary p-3 font-mono text-[10px] break-all">
              VoidPr0gramPENDING1111111111111111111111
            </div>
          </section>
          <section>
            <label className="font-mono text-label-mono-sm text-outline block mb-2">// MINTED_SUPPLY</label>
            <div className="text-primary font-mono text-lg tabular-nums">
              {minted.toLocaleString()} / {TOTAL_SUPPLY.toLocaleString()}
            </div>
          </section>
          <section>
            <label className="font-mono text-label-mono-sm text-outline block mb-2">// ESTIMATED_COST</label>
            <div className="text-primary font-mono text-lg tabular-nums">
              {(quantity * PRICE_SOL).toFixed(2)} SOL
            </div>
          </section>
          <section className="border-t border-primary pt-4">
            <label className="font-mono text-label-mono-sm text-outline block mb-2">// WALLET_STATUS</label>
            <div className="font-mono text-system-mono">
              {wallet.address ? 'CONNECTED' : 'AWAITING_CONNECTION'}
            </div>
          </section>
        </div>
        <div className="mt-auto pt-6 border-t border-primary relative z-10">
          <p className="font-mono text-label-mono-sm text-outline leading-relaxed">
            TERMINAL ACCESS GRANTED. ALL TRANSACTIONS ARE PERMANENT AND RECORDED ON THE VOID DISTRIBUTED LEDGER.
          </p>
        </div>
      </aside>

      <div className="flex-grow flex items-center justify-center p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl w-full border border-primary bg-background p-1 relative overflow-hidden"
        >
          <div className="scanline" />
          <div className="border border-primary p-6 md:p-12 flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="aspect-square border border-primary relative">
                <ArtPiece src={objectArt} alt="VOID unit — aperture composition on black" label="OBJECT_001" />
              </div>
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <h1 className="font-display text-display-lg-mobile uppercase leading-[0.9] mb-4">VOID_UNIT</h1>
                  <p className="font-mono text-outline text-sm">
                    Generative monochrome unit, permanently recorded on the protocol.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-primary pb-2">
                    <span className="font-mono text-label-mono-sm text-outline">SUPPLY</span>
                    <span className="font-mono text-primary tabular-nums">
                      {minted.toLocaleString()} / {TOTAL_SUPPLY.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-end border-b border-primary pb-2">
                    <span className="font-mono text-label-mono-sm text-outline">PRICE</span>
                    <span className="font-mono text-primary">{PRICE_SOL} SOL</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-4">
                <label className="font-mono text-label-mono-sm text-outline block mb-2 uppercase">
                  QUANTITY_CMD
                </label>
                <div className="flex border border-primary h-12">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantity(-1)}
                    className="w-12 flex items-center justify-center border-r border-primary hover:bg-primary hover:text-background transition-colors text-xl"
                    aria-label="Decrease quantity"
                  >
                    -
                  </motion.button>
                  <div className="flex-grow flex items-center justify-center font-mono text-primary tabular-nums overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={quantity}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                      >
                        {String(quantity).padStart(2, '0')}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantity(1)}
                    className="w-12 flex items-center justify-center border-l border-primary hover:bg-primary hover:text-background transition-colors text-xl"
                    aria-label="Increase quantity"
                  >
                    +
                  </motion.button>
                </div>
              </div>
              <div className="md:col-span-8">
                <label className="font-mono text-label-mono-sm text-outline block mb-2 uppercase">
                  EXECUTION_SEQUENCE
                </label>
                <motion.button
                  whileHover={{ scale: minting ? 1 : 1.02 }}
                  whileTap={{ scale: minting ? 1 : 0.98 }}
                  onClick={handleMint}
                  disabled={minting}
                  className="w-full h-12 border border-primary bg-primary text-background font-mono uppercase font-bold hover:bg-transparent hover:text-primary transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <motion.span
                    className="active-dot"
                    animate={minting ? { opacity: [1, 0.2, 1] } : { opacity: 1 }}
                    transition={minting ? { repeat: Infinity, duration: 0.8 } : {}}
                  />
                  {minting ? 'MINTING…' : wallet.address ? 'INITIALIZE MINT' : 'CONNECT WALLET TO MINT'}
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {minting && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="border border-primary bg-surface-container p-4 overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-label-mono-sm text-primary uppercase">SCANNING_MEMPOOL...</span>
                    <span className="font-mono text-label-mono-sm text-outline">{progress}%</span>
                  </div>
                  <div className="w-full h-1 bg-background">
                    <motion.div
                      className="h-full bg-primary"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <aside className="hidden xl:flex w-64 border-l border-primary p-6 flex-col gap-4">
        <header className="border-b border-primary pb-2">
          <span className="font-mono text-label-mono-sm text-outline uppercase">LIVE_SIGNAL_LOG</span>
        </header>
        <div className="font-mono text-label-mono-sm text-outline space-y-2 overflow-y-auto max-h-[60vh]">
          <AnimatePresence initial={false}>
            {logs.map((log, i) => (
              <motion.div
                key={log + i}
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={log.includes('SUCCESS') ? 'text-primary' : ''}
              >
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </aside>
    </section>
  )
}
