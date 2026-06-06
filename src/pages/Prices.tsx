import { useState, useEffect } from 'react'
import { fetchRoutes } from '../lib/api'
import PageHeader from '../components/ui/PageHeader'
import EmptyState from '../components/ui/EmptyState'
import Badge from '../components/ui/Badge'
import Spinner from '../components/ui/Spinner'
import ErrorMessage from '../components/ui/ErrorMessage'

interface RoutePrice {
  method: 'grand-taxi' | 'bus' | 'indrive'
  price: number
  duration: string
}

interface Route {
  id: string
  from_city: string
  to_city: string
  route_prices: RoutePrice[]
}

const methodLabels: Record<string, string> = {
  'grand-taxi': 'Grand Taxi',
  'bus': 'Bus',
  'indrive': 'InDrive',
}

const methodBadgeColors: Record<string, 'green' | 'blue' | 'amber'> = {
  'grand-taxi': 'green',
  'bus': 'blue',
  'indrive': 'amber',
}

export default function Prices() {
  const [routes, setRoutes] = useState<Route[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  useEffect(() => {
    fetchRoutes()
      .then(setRoutes)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const cities = [...new Set(routes.flatMap(r => [r.from_city, r.to_city]))].sort()

  const results = routes.filter(r => {
    const matchFrom = !from || r.from_city === from
    const matchTo = !to || r.to_city === to
    return matchFrom && matchTo
  })

  const cheapest = (prices: RoutePrice[]) =>
    Math.min(...prices.map(p => p.price))

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message="Could not load routes. Make sure the server is running." />

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <PageHeader
        title="Transport prices"
        description="Compare Grand Taxi, bus, and InDrive costs across Morocco."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">From</label>
          <select
            value={from}
            onChange={e => setFrom(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-emerald-400"
          >
            <option value="">All cities</option>
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
            <option value="">All cities</option>
            {cities.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {results.length === 0 ? (
        <EmptyState
          title="No routes found"
          description="Try a different city combination."
        />
      ) : (
        <div className="flex flex-col gap-4">
          {results.map(route => (
            <div key={route.id} className="border border-gray-100 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-semibold text-gray-900">{route.from_city}</span>
                <span className="text-gray-300">→</span>
                <span className="text-sm font-semibold text-gray-900">{route.to_city}</span>
                <span className="ml-auto text-xs text-gray-400">
                  from <span className="text-emerald-600 font-medium">{cheapest(route.route_prices)} MAD</span>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {route.route_prices.map(p => (
                  <div key={p.method} className="border border-gray-100 rounded-lg px-4 py-3">
                    <div className="mb-2">
                      <Badge label={methodLabels[p.method]} color={methodBadgeColors[p.method]} />
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{p.price} MAD</p>
                    <p className="text-xs text-gray-400">{p.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}