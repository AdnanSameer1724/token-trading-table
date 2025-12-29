'use client'

import { useEffect, useState, useMemo, memo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks/redux'
import { useWebSocket } from '@/app/lib/hooks/useWebSocket'
import { setTokens, setLoading, setSorting } from '@/app/lib/store/tokensSlice'
import { fetchTokens } from '@/app/lib/api/mockData'
import { TokenStatus, SortField } from '@/app/lib/types'
import TokenRow from './TokenRow'
import TokenCard from './TokenTableMobile'
import { Skeleton } from '../ui/skeleton'
import { ArrowUpDown, Search } from 'lucide-react'

const TokenTable = memo(function TokenTable() {
  const dispatch = useAppDispatch()
  const { tokens, loading, sortBy, sortOrder } = useAppSelector(state => state.tokens)
  const [activeTab, setActiveTab] = useState<TokenStatus>(TokenStatus.NEW_PAIR)
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
  })

  useEffect(() => {
    if (data) {
      dispatch(setTokens(data))
    }
  }, [data, dispatch])

  useEffect(() => {
    dispatch(setLoading(isLoading))
  }, [isLoading, dispatch])

  useWebSocket()

  const filteredTokens = useMemo(() => {
    let filtered = tokens.filter(token => token.status === activeTab)
    
    if (searchQuery) {
      filtered = filtered.filter(token =>
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return filtered
  }, [tokens, activeTab, searchQuery])

  const handleSort = (field: SortField) => {
    const newOrder = sortBy === field && sortOrder === 'desc' ? 'asc' : 'desc'
    dispatch(setSorting({ field, order: newOrder }))
  }

  const tabs = [
    { label: 'New Pairs', value: TokenStatus.NEW_PAIR },
    { label: 'Final Stretch', value: TokenStatus.FINAL_STRETCH },
    { label: 'Migrated', value: TokenStatus.MIGRATED },
  ]

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-gray-800">
        <div className="flex gap-4">
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`pb-3 px-2 font-medium transition-colors relative ${
                activeTab === tab.value
                  ? 'text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
              {activeTab === tab.value && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </button>
          ))}
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
          />
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
              <th className="pb-3 font-medium w-12">#</th>
              <th className="pb-3 font-medium w-48">Token</th>
              <th className="pb-3 font-medium cursor-pointer hover:text-gray-300" onClick={() => handleSort('price')}>
                <div className="flex items-center gap-1">
                  Price <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="pb-3 font-medium cursor-pointer hover:text-gray-300" onClick={() => handleSort('priceChange24h')}>
                <div className="flex items-center gap-1">
                  24h % <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="pb-3 font-medium cursor-pointer hover:text-gray-300" onClick={() => handleSort('volume24h')}>
                <div className="flex items-center gap-1">
                  Volume <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="pb-3 font-medium cursor-pointer hover:text-gray-300" onClick={() => handleSort('marketCap')}>
                <div className="flex items-center gap-1">
                  Market Cap <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="pb-3 font-medium cursor-pointer hover:text-gray-300" onClick={() => handleSort('holders')}>
                <div className="flex items-center gap-1">
                  Holders <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="pb-3 font-medium">Progress</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-800/50">
                  <td className="py-4"><Skeleton className="h-4 w-8" /></td>
                  <td className="py-4"><Skeleton className="h-10 w-40" /></td>
                  <td className="py-4"><Skeleton className="h-4 w-20" /></td>
                  <td className="py-4"><Skeleton className="h-4 w-16" /></td>
                  <td className="py-4"><Skeleton className="h-4 w-24" /></td>
                  <td className="py-4"><Skeleton className="h-4 w-24" /></td>
                  <td className="py-4"><Skeleton className="h-4 w-16" /></td>
                  <td className="py-4"><Skeleton className="h-4 w-32" /></td>
                  <td className="py-4"><Skeleton className="h-8 w-20" /></td>
                </tr>
              ))
            ) : (
              filteredTokens.map((token, index) => (
                <TokenRow key={token.id} token={token} index={index + 1} />
              ))
            )}
          </tbody>
        </table>

        {!isLoading && !loading && filteredTokens.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No tokens found in this category
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-3">
        {isLoading || loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <Skeleton className="h-20 w-full" />
            </div>
          ))
        ) : (
          filteredTokens.map((token, index) => (
            <TokenCard key={token.id} token={token} index={index + 1} />
          ))
        )}
        
        {!isLoading && !loading && filteredTokens.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No tokens found in this category
          </div>
        )}
      </div>
    </div>
  )
})

export default TokenTable