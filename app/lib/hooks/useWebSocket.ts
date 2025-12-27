import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from './redux'
import { updateTokenPrice } from '../store/tokensSlice'
import { generateMockWebSocketData } from '../utils'

export function useWebSocket() {
  const dispatch = useAppDispatch()
  const tokens = useAppSelector(state => state.tokens.tokens)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (tokens.length === 0) return

    // Simulate WebSocket updates every 2-4 seconds
    intervalRef.current = setInterval(() => {
      // Update 1-3 random tokens
      const numUpdates = Math.floor(Math.random() * 3) + 1
      const tokensToUpdate = [...tokens]
        .sort(() => Math.random() - 0.5)
        .slice(0, numUpdates)

      tokensToUpdate.forEach(token => {
        const newPrice = generateMockWebSocketData(token.price)
        dispatch(updateTokenPrice({ id: token.id, price: newPrice }))
      })
    }, Math.random() * 2000 + 2000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [tokens, dispatch])
}