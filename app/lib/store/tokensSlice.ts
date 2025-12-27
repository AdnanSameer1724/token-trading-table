import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Token, TokenListState, SortField } from '../types'

const initialState: TokenListState = {
  tokens: [],
  loading: false,
  error: null,
  sortBy: null,
  sortOrder: 'desc',
}

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload
      state.loading = false
      state.error = null
    },
    
    updateTokenPrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const token = state.tokens.find(t => t.id === action.payload.id)
      if (token) {
        const oldPrice = token.price
        token.price = action.payload.price
        token.priceChange24h = ((action.payload.price - oldPrice) / oldPrice) * 100
      }
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    
    setSorting: (state, action: PayloadAction<{ field: SortField; order: 'asc' | 'desc' }>) => {
      state.sortBy = action.payload.field
      state.sortOrder = action.payload.order
      
      // Apply sorting
      state.tokens.sort((a, b) => {
        const field = action.payload.field
        const order = action.payload.order === 'asc' ? 1 : -1
        
        if (field === 'createdAt') {
          return (a[field].getTime() - b[field].getTime()) * order
        }
        
        const aVal = a[field] as number
        const bVal = b[field] as number
        return (aVal - bVal) * order
      })
    },
    
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { 
  setTokens, 
  updateTokenPrice, 
  setLoading, 
  setError, 
  setSorting,
  clearError 
} = tokensSlice.actions

export default tokensSlice.reducer