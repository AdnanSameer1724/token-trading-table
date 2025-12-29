'use client'

import { memo } from 'react'
import { Token } from '@/app/lib/types'
import { formatCurrency, formatNumber, formatPercentage, getChangeColor } from '@/app/lib/utils'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { TrendingUp } from 'lucide-react'

interface TokenCardProps {
  token: Token
  index: number
}

const TokenCard = memo(function TokenCard({ token, index }: TokenCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-sm">{index}</span>
          <img src={token.imageUrl} alt={token.symbol} className="w-10 h-10 rounded-full" />
          <div>
            <div className="font-medium text-white">{token.name}</div>
            <div className="text-sm text-gray-400">{token.symbol}</div>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <TrendingUp className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Trade {token.symbol}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src={token.imageUrl} alt={token.symbol} className="w-12 h-12 rounded-full" />
                <div>
                  <div className="font-medium">{token.name}</div>
                  <div className="text-sm text-gray-400">{token.symbol}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Price:</span>
                  <span className="font-mono">{formatCurrency(token.price, 6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">24h Change:</span>
                  <span className={getChangeColor(token.priceChange24h)}>
                    {formatPercentage(token.priceChange24h)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Market Cap:</span>
                  <span>{formatCurrency(token.marketCap)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Holders:</span>
                  <span>{formatNumber(token.holders, 0)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Buy</Button>
                <Button variant="outline" className="flex-1">Sell</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-gray-400 text-xs mb-1">Price</div>
          <div className="font-medium">{formatCurrency(token.price, 6)}</div>
        </div>
        <div>
          <div className="text-gray-400 text-xs mb-1">24h Change</div>
          <div className={getChangeColor(token.priceChange24h)}>
            {formatPercentage(token.priceChange24h)}
          </div>
        </div>
        <div>
          <div className="text-gray-400 text-xs mb-1">Volume</div>
          <div>{formatCurrency(token.volume24h)}</div>
        </div>
        <div>
          <div className="text-gray-400 text-xs mb-1">Holders</div>
          <div>{formatNumber(token.holders, 0)}</div>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
          <span>Progress</span>
          <span>{token.bondingCurve.toFixed(0)}%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${token.bondingCurve}%` }}
          />
        </div>
      </div>
    </div>
  )
})

export default TokenCard