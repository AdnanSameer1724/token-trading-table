import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number, decimals: number = 2): string {
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(decimals)}B`
  }
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(decimals)}M`
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(decimals)}K`
  }
  return num.toFixed(decimals)
}

export function formatCurrency(amount: number, decimals: number = 2): string {
  return `$${formatNumber(amount, decimals)}`
}

export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

export function getChangeColor(change: number): string {
  if (change > 0) return 'text-green-500'
  if (change < 0) return 'text-red-500'
  return 'text-gray-500'
}

export function generateMockWebSocketData(basePrice: number): number {
  const changePercent = (Math.random() - 0.5) * 0.1
  return basePrice * (1 + changePercent)
}