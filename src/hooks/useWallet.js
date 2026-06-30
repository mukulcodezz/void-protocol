import { useCallback, useState } from 'react'

export function useWallet() {
  const [address, setAddress] = useState(null)
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState(null)

  const connect = useCallback(async () => {
    const provider = window.solana
    if (!provider?.isPhantom) {
      setError('No Solana wallet found. Install Phantom or another Solana browser wallet.')
      return
    }
    setConnecting(true)
    setError(null)
    try {
      const resp = await provider.connect()
      setAddress(resp.publicKey.toString())
    } catch (err) {
      setError(err?.message ?? 'Connection rejected.')
    } finally {
      setConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    window.solana?.disconnect?.()
    setAddress(null)
  }, [])

  return { address, connecting, error, connect, disconnect }
}

export function shortenAddress(address) {
  if (!address) return ''
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}
