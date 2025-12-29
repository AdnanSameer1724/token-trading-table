'use client'

import { memo, useState, useEffect } from 'react'
import { Token } from '@/app/lib/types'
import { formatCurrency, formatNumber, formatPercentage, getChangeColor, cn } from '@/app/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { TrendingUp, Zap } from 'lucide-react'

interface TokenRowProps {
  token: Token
  index: number
}

const TokenRow = memo(function TokenRow({ token, index }: TokenRowProps) {
  const [priceColor, setPriceColor] = useState('text-white')
  const [prevPrice, setPrevPrice] = useState(token.price)

  useEffect(() => {
    if (token.price !== prevPrice) {
      setPriceColor(token.price > prevPrice ? 'text-green-400' : 'text-red-400')
      const timer = setTimeout(() => setPriceColor('text-white'), 500)
      setPrevPrice(token.price)
      return () => clearTimeout(timer)
    }
  }, [token.price, prevPrice])

  // Calculate token age in minutes
  const tokenAgeMinutes = Math.floor((Date.now() - token.createdAt.getTime()) / 60000)

  return (
    <tr className="border-b border-gray-800/50 hover:bg-gray-800/40 transition-all duration-150">
      <td className="py-4 px-4 text-gray-400">{index}</td>
      
      {/* Token Info */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <img 
            src={token.imageUrl} 
            alt={token.symbol} 
            className="w-10 h-10 rounded-full ring-2 ring-gray-800"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{token.name}</span>
              {tokenAgeMinutes < 60 && (
                <Badge variant="success" className="text-[10px] px-1.5 py-0">
                  {tokenAgeMinutes}m
                </Badge>
              )}
            </div>
            <div className="text-sm text-gray-400">{token.symbol}</div>
          </div>
        </div>
      </td>

      {/* Price with color transition */}
      <td className={cn("py-4 px-4 font-medium transition-colors duration-300", priceColor)}>
        {formatCurrency(token.price, 6)}
      </td>

      {/* 24h Change */}
      <td className="py-4 px-4">
        <span className={getChangeColor(token.priceChange24h)}>
          {formatPercentage(token.priceChange24h)}
        </span>
      </td>

      {/* Volume with Tooltip */}
      <td className="py-4 px-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-help">
              {formatCurrency(token.volume24h)}
            </TooltipTrigger>
            <TooltipContent>
              <p>24h Trading Volume</p>
              <p className="font-mono">${token.volume24h.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </td>

      {/* Market Cap */}
      <td className="py-4 px-4">{formatCurrency(token.marketCap)}</td>

      {/* Holders with Popover */}
      <td className="py-4 px-4">
        <Popover>
          <PopoverTrigger className="hover:text-blue-400 cursor-pointer transition-colors">
            {formatNumber(token.holders, 0)}
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-2">
              <h4 className="font-medium">Holder Information</h4>
              <div className="text-sm space-y-1">
                <p>Total Holders: <span className="font-mono">{token.holders}</span></p>
                <p>Liquidity: {formatCurrency(token.liquidity)}</p>
                <p>Created: {token.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </td>

      {/* Progress Bar */}
      <td className="py-4 px-4">
        <div className="w-32">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>Bonding</span>
            <span>{token.bondingCurve.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${token.bondingCurve}%` }}
            />
          </div>
        </div>
      </td>

      {/* Actions with Modal */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          {/* Quick Buy Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              alert(`Quick Buy ${token.symbol}!`)
            }}
            className="p-2 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 transition-colors group"
            title="Quick Buy"
          >
            <Zap className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <TrendingUp className="h-4 w-4 mr-1" />
                Trade
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
                {token.description && (
                  <p className="text-sm text-gray-400">{token.description}</p>
                )}
                <div className="flex gap-2">
                  <Button className="flex-1">Buy</Button>
                  <Button variant="outline" className="flex-1">Sell</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </td>
    </tr>
  )
})

export default TokenRow