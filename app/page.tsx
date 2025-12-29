import TokenTable from './components/tokens/TokenTable'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Token Discovery
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Track and trade the latest tokens in real-time
          </p>
        </header>
        
        <TokenTable />
      </div>
    </main>
  )
}