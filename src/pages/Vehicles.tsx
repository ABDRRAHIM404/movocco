import PageHeader from '../components/ui/PageHeader'
import Badge from '../components/ui/Badge'

const vehicles = [
  {
    id: '1',
    name: 'Grand Taxi',
    arabic: 'طاكسي كبير',
    type: 'Shared long-distance taxi',
    capacity: '6 passengers',
    color: 'Usually beige or white',
    cost: 'Fixed shared price per seat — negotiate before boarding',
    bestFor: 'Intercity travel between towns and cities',
    tips: [
      'Always agree on the price before getting in',
      'You can buy all 6 seats for a private ride',
      'Departs when full — can wait 20–40 minutes',
      'Luggage may cost extra',
    ],
    badge: 'Most common',
    badgeColor: 'green' as const,
  },
  {
    id: '2',
    name: 'Petit Taxi',
    arabic: 'طاكسي صغير',
    type: 'City taxi',
    capacity: '3 passengers',
    color: 'Color varies by city (red in Marrakech, blue in Rabat)',
    cost: 'Metered — insist the driver uses the meter',
    bestFor: 'Short trips within a city',
    tips: [
      'Only operates within city limits',
      'Always ask for the meter to be turned on',
      'Can be shared with strangers going the same way',
      'Cheaper than Grand Taxi for short urban trips',
    ],
    badge: 'City only',
    badgeColor: 'blue' as const,
  },
  {
    id: '3',
    name: 'CTM Bus',
    arabic: 'حافلة CTM',
    type: 'Long-distance coach',
    capacity: 'Up to 48 passengers',
    color: 'White and red branding',
    cost: 'Fixed ticket price — book in advance online or at station',
    bestFor: 'Comfortable long-distance travel between major cities',
    tips: [
      'Most reliable and comfortable bus option',
      'Book tickets in advance during peak season',
      'Luggage stored underneath — keep valuables with you',
      'Air conditioned with assigned seating',
    ],
    badge: 'Most comfortable',
    badgeColor: 'amber' as const,
  },
  {
    id: '4',
    name: 'Supratours Bus',
    arabic: 'حافلة سوبراتور',
    type: 'Long-distance coach',
    capacity: 'Up to 48 passengers',
    color: 'Blue and white branding',
    cost: 'Fixed ticket price — connected to ONCF train network',
    bestFor: 'Travel to destinations connected to the train network',
    tips: [
      'Operated by ONCF — integrates with train tickets',
      'Good coverage of southern Morocco',
      'Reliable schedules and comfortable seats',
      'Book ahead for popular routes like Marrakech–Agadir',
    ],
    badge: 'Train connected',
    badgeColor: 'purple' as const,
  },
  {
    id: '5',
    name: 'InDrive',
    arabic: 'إن درايف',
    type: 'Ride-hailing app',
    capacity: '4 passengers',
    color: 'Private cars — no uniform color',
    cost: 'Negotiate the price in-app before confirming the ride',
    bestFor: 'Private comfortable rides without haggling in person',
    tips: [
      'Download the InDrive app before you need it',
      'You propose a price — driver accepts or counters',
      'More expensive than Grand Taxi but more convenient',
      'Available in most major Moroccan cities',
    ],
    badge: 'App-based',
    badgeColor: 'gray' as const,
  },
]

export default function Vehicles() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <PageHeader
        title="Vehicle guide"
        description="Learn how to identify and use every type of transport in Morocco."
      />

      <div className="flex flex-col gap-5">
        {vehicles.map(v => (
          <div key={v.id} className="border border-gray-100 rounded-xl p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="text-base font-semibold text-gray-900">{v.name}</h2>
                  <Badge label={v.badge} color={v.badgeColor} />
                </div>
                <p className="text-xs text-gray-400">{v.arabic} · {v.type}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg px-4 py-3">
                <p className="text-xs text-gray-400 mb-0.5">Capacity</p>
                <p className="text-sm font-medium text-gray-900">{v.capacity}</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-4 py-3">
                <p className="text-xs text-gray-400 mb-0.5">Color</p>
                <p className="text-sm font-medium text-gray-900">{v.color}</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-4 py-3">
                <p className="text-xs text-gray-400 mb-0.5">Best for</p>
                <p className="text-sm font-medium text-gray-900">{v.bestFor}</p>
              </div>
            </div>

            <div className="border border-emerald-100 bg-emerald-50 rounded-lg px-4 py-3 mb-4">
              <p className="text-xs text-emerald-600 font-medium mb-0.5">Cost</p>
              <p className="text-sm text-emerald-900">{v.cost}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-400 mb-2">Travel tips</p>
              <ul className="flex flex-col gap-1.5">
                {v.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}