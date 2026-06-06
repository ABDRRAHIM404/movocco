import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Badge from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'

const hubs = [
  {
    id: '1',
    name: 'Agadir Grand Taxi Station',
    city: 'Agadir',
    address: 'Avenue du Prince Moulay Abdellah, Agadir',
    destinations: ['Marrakech', 'Essaouira', 'Imsouane', 'Tiznit'],
    type: 'Grand Taxi',
    notes: 'Main hub for long-distance grand taxis heading north and south.',
  },
  {
    id: '2',
    name: 'Marrakech CTM Bus Station',
    city: 'Marrakech',
    address: 'Bab Doukkala, Marrakech',
    destinations: ['Casablanca', 'Agadir', 'Essaouira', 'Fes'],
    type: 'Bus',
    notes: 'Central bus terminal for CTM and Supratours services.',
  },
  {
    id: '3',
    name: 'Essaouira Grand Taxi Stand',
    city: 'Essaouira',
    address: 'Avenue du Caire, Essaouira',
    destinations: ['Marrakech', 'Agadir', 'Safi'],
    type: 'Grand Taxi',
    notes: 'Located near the medina walls. Easy to find from the town center.',
  },
  {
    id: '4',
    name: 'Casablanca Ouled Ziane Bus Terminal',
    city: 'Casablanca',
    address: 'Ouled Ziane, Casablanca',
    destinations: ['Marrakech', 'Agadir', 'Fes', 'Rabat', 'Tangier'],
    type: 'Bus',
    notes: 'Largest bus terminal in Casablanca. Multiple operators available.',
  },
  {
    id: '5',
    name: 'Imsouane Taxi Stop',
    city: 'Imsouane',
    address: 'Village entrance, Imsouane',
    destinations: ['Agadir', 'Tamri'],
    type: 'Grand Taxi',
    notes: 'Small informal stop at the village entrance. Ask locals if unsure.',
  },
]

const cities = [...new Set(hubs.map(h => h.city))].sort()

export default function Hubs() {
  const [city, setCity] = useState('')
  const filtered = hubs.filter(h => !city || h.city === city)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <PageHeader
        title="Taxi hub locator"
        description="Find Grand Taxi stations and bus terminals across Morocco."
      />

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
                  {hub.destinations.map(d => (
                    <Badge key={d} label={d} color="gray" />
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