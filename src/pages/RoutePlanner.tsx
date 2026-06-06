import { useState } from 'react'
import { cities } from '../lib/data'
import PageHeader from '../components/ui/PageHeader'
import Badge from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'

interface Step {
  from: string
  to: string
  method: string
  cost: number
  duration: string
}

interface PlannedRoute {
  steps: Step[]
  totalCost: number
  totalDuration: string
}

const mockRoutes: Record<string, PlannedRoute> = {
  'Agadir-Marrakech': {
    steps: [{ from: 'Agadir', to: 'Marrakech', method: 'Grand Taxi', cost: 80, duration: '3h' }],
    totalCost: 80,
    totalDuration: '3h',
  },
  'Agadir-Casablanca': {
    steps: [
      { from: 'Agadir', to: 'Marrakech', method: 'Grand Taxi', cost: 80, duration: '3h' },
      { from: 'Marrakech', to: 'Casablanca', method: 'Bus', cost: 70, duration: '4h' },
    ],
    totalCost: 150,
    totalDuration: '7h',
  },
  'Agadir-Essaouira': {
    steps: [{ from: 'Agadir', to: 'Essaouira', method: 'Grand Taxi', cost: 50, duration: '2h 30m' }],
    totalCost: 50,
    totalDuration: '2h 30m',
  },
  'Marrakech-Essaouira': {
    steps: [{ from: 'Marrakech', to: 'Essaouira', method: 'Bus', cost: 40, duration: '3h' }],
    totalCost: 40,
    totalDuration: '3h',
  },
  'Marrakech-Casablanca': {
    steps: [{ from: 'Marrakech', to: 'Casablanca', method: 'Grand Taxi', cost: 100, duration: '3h 30m' }],
    totalCost: 100,
    totalDuration: '3h 30m',
  },
}

const methodBadgeColor = (method: string): 'green' | 'blue' | 'amber' => {
  if (method === 'Grand Taxi') return 'green'
  if (method === 'Bus') return 'blue'
  return 'amber'
}

export default function RoutePlanner() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [result, setResult] = useState<PlannedRoute | null>(null)
  const [searched, setSearched] = useState(false)

  function handleSearch() {
    if (!from || !to) return
    const key = `${from}-${to}`
    setResult(mockRoutes[key] ?? null)
    setSearched(true)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <PageHeader
        title="Route planner"
        description="Find the best way to get between destinations in Morocco."
      />

      <div className="border border-gray-100 rounded-xl p-5 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">From</label>
            <select
              value={from}
              onChange={e => setFrom(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-emerald-400"
            >
              <option value="">Select city</option>
              {cities.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">To</label>
            <select
              value={to}
              onChange={e => setTo(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-emerald-400"
            >
              <option value="">Select city</option>
              {cities.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <button
          onClick={handleSearch}
          disabled={!from || !to}
          className="w-full bg-emerald-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Find route
        </button>
      </div>

      {searched && !result && (
        <EmptyState
          title="No route found"
          description="We don't have that combination yet — more routes coming soon."
        />
      )}

      {result && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Estimated cost</p>
              <p className="text-2xl font-semibold text-emerald-600">{result.totalCost} MAD</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Estimated time</p>
              <p className="text-2xl font-semibold text-gray-900">{result.totalDuration}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {result.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-medium flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  {i < result.steps.length - 1 && (
                    <div className="w-px h-8 bg-gray-200 mt-1" />
                  )}
                </div>
                <div className="flex-1 border border-gray-100 rounded-xl p-4 -mt-0.5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                      <span>{step.from}</span>
                      <span className="text-gray-300">→</span>
                      <span>{step.to}</span>
                    </div>
                    <Badge label={step.method} color={methodBadgeColor(step.method)} />
                  </div>
                  <div className="flex gap-4 text-xs text-gray-400">
                    <span>{step.cost} MAD</span>
                    <span>{step.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}