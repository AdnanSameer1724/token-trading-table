'use client'

import { useEffect, useState } from 'react'

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({ fps: 0, renderTime: 0 })
  const [showMetrics, setShowMetrics] = useState(false)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationFrameId: number

    const measurePerformance = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        setMetrics({
          fps: frameCount,
          renderTime: Math.round(currentTime - lastTime) / frameCount
        })
        frameCount = 0
        lastTime = currentTime
      }
      
      animationFrameId = requestAnimationFrame(measurePerformance)
    }

    animationFrameId = requestAnimationFrame(measurePerformance)

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  if (!showMetrics) {
    return (
      <button
        onClick={() => setShowMetrics(true)}
        className="fixed bottom-4 right-4 bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-2 rounded-lg text-xs font-mono border border-gray-700 transition-colors z-50"
      >
        Show Metrics
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs font-mono space-y-1 z-50 shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <span className="text-gray-400">Performance</span>
        <button
          onClick={() => setShowMetrics(false)}
          className="text-gray-500 hover:text-gray-300"
        >
          ✕
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-400">FPS:</span>
        <span className={metrics.fps >= 50 ? 'text-green-400' : 'text-yellow-400'}>
          {metrics.fps}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-400">Render:</span>
        <span className="text-blue-400">{metrics.renderTime.toFixed(2)}ms</span>
      </div>
    </div>
  )
}