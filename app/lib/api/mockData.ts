import { Token, TokenStatus } from "../types"
const tokenNames = [
  'SolanaAI', 'MoonDoge', 'PepeRevolution', 'SafeRocket', 'ElonTrump',
  'MetaVerse', 'CryptoKing', 'DiamondHands', 'RocketMoon', 'BabyShiba',
  'QuantumLeap', 'DegenDao', 'ApeMatic', 'FlokiSafe', 'ShibaElite'
]

const symbols = [
  'SOLAI', 'MDOGE', 'PEPR', 'SRKT', 'ETMP',
  'MTVS', 'CRYP', 'DMND', 'RMOON', 'BSHIB',
  'QLEP', 'DGDAO', 'APEM', 'FLKS', 'SHEL'
]

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function generateToken(index: number, status: TokenStatus): Token {
  const basePrice = randomBetween(0.000001, 1.5)
  
  return {
    id: `token-${status}-${index}`,
    name: tokenNames[index % tokenNames.length],
    symbol: symbols[index % symbols.length],
    price: basePrice,
    priceChange24h: randomBetween(-45, 120),
    volume24h: randomBetween(1000, 5000000),
    marketCap: randomBetween(50000, 10000000),
    liquidity: randomBetween(10000, 500000),
    holders: Math.floor(randomBetween(50, 5000)),
    status,
    bondingCurve: status === TokenStatus.NEW_PAIR ? randomBetween(10, 95) : 100,
    createdAt: new Date(Date.now() - Math.random() * 86400000 * 7),
    description: `${tokenNames[index % tokenNames.length]} is revolutionizing the crypto space`,
    imageUrl: `https://api.dicebear.com/7.x/shapes/svg?seed=${symbols[index % symbols.length]}`,
  }
}

export function generateMockTokens(): Token[] {
  const tokens: Token[] = []
  
  // Generate new pairs (8 tokens)
  for (let i = 0; i < 8; i++) {
    tokens.push(generateToken(i, TokenStatus.NEW_PAIR))
  }
  
  // Generate final stretch (5 tokens)
  for (let i = 8; i < 13; i++) {
    tokens.push(generateToken(i, TokenStatus.FINAL_STRETCH))
  }
  
  // Generate migrated (4 tokens)
  for (let i = 13; i < 17; i++) {
    tokens.push(generateToken(i, TokenStatus.MIGRATED))
  }
  
  return tokens
}

export async function fetchTokens(): Promise<Token[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  return generateMockTokens()
}