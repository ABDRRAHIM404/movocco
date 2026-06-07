import { useState, useEffect } from 'react'
import { fetchHubs } from '../lib/api'
import PageHeader from '../components/ui/PageHeader'
import Badge from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'
import Spinner from '../components/ui/Spinner'
import ErrorMessage from '../components/ui/ErrorMessage'
import HubMap from '../components/map/HubMap'

interface Hub {
  id: string
  name: string
  city: string
  address: string
  type: 'Grand Taxi' | 'Bus'
  notes: string
  hub_destinations: { destination: string }[]
}

export default function Hubs() {
  const [hubs, setHubs] = useState<Hub[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [city, setCity] = useState('')

  useEffect(() => {
    fetchHubs()
      .then(setHubs)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const cities = [...new Set(hubs.map(h => h.city))].sort()
  const filtered = hubs.filter(h => !city || h.city === city)

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message="Could not load hubs. Make sure the server is running." />

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <PageHeader
        title="Taxi hub locator"
        description="Find Grand Taxi stations and bus terminals across Morocco."
      />

      {/* Map */}
      <div className="mb-8">
        <HubMap hubs={hubs} />
      </div>

      {/* Filter */}
      <div className="mb-6 max-w-xs">
        <label className="text-xs font-medium text-gray-500 mb-1 block">Filter by city</label>
        <select
          value={city}
          onChange={e => setCity(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-emerald-400"
        >
          <option value="">All cities</option>
          {cities.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Hub cards */}
      {filtered.length === 0 ? (
        <EmptyState title="No hubs found" description="Try a different city." />
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map(hub => (
            <div key={hub.id} className="border border-gray-100 rounded-xl p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900 mb-0.5">{hub.name}</h2>
                  <p className="text-xs text-gray-400">{hub.address}</p>
                </div>
                <Badge label={hub.type} color={hub.type === 'Bus' ? 'blue' : 'green'} />
              </div>
              <p className="text-sm text-gray-500 mb-3">{hub.notes}</p>
              <div>
                <p className="text-xs font-medium text-gray-400 mb-1.5">Destinations served</p>
                <div className="flex flex-wrap gap-2">
                  {hub.hub_destinations.map(d => (
                    <Badge key={d.destination} label={d.destination} color="gray" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}