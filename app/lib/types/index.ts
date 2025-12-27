export enum TokenStatus {
  NEW_PAIR = 'new_pair',
  FINAL_STRETCH = 'final_stretch',
  MIGRATED = 'migrated',
}

export interface Token {
  id: string
  name: string
  symbol: string
  price: number
  priceChange24h: number
  volume24h: number
  marketCap: number
  liquidity: number
  holders: number
  status: TokenStatus
  bondingCurve: number
  createdAt: Date
  description?: string
  website?: string
  twitter?: string
  telegram?: string
  imageUrl?: string
}

export interface TokenListState {
  tokens: Token[]
  loading: boolean
  error: string | null
  sortBy: SortField | null
  sortOrder: 'asc' | 'desc'
}

export type SortField = 
  | 'price' 
  | 'priceChange24h' 
  | 'volume24h' 
  | 'marketCap' 
  | 'liquidity' 
  | 'holders'
  | 'createdAt'

export interface WebSocketMessage {
  type: 'price_update' | 'new_token' | 'status_change'
  data: {
    tokenId: string
    price?: number
    status?: TokenStatus
  }
}