import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Transport prices',
    description: 'Compare Grand Taxi, bus, and InDrive costs between destinations.',
    path: '/prices',
    icon: '💰',
  },
  {
    title: 'Route planner',
    description: 'Find the best way to get from A to B across Morocco.',
    path: '/routes',
    icon: '🗺️',
  },
  {
    title: 'Hub locator',
    description: 'Find Grand Taxi stations and transport hubs near you.',
    path: '/hubs',
    icon: '📍',
  },
  {
    title: 'Vehicle guide',
    description: 'Learn to identify Grand Taxis, Petit Taxis, CTM buses and more.',
    path: '/vehicles',
    icon: '🚕',
  },
  {
    title: 'Reviews',
    description: 'Read and share real travel experiences from other tourists.',
    path: '/reviews',
    icon: '⭐',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-emerald-50 border-b border-emerald-100 px-4 py-20 text-center">
        <p className="text-sm font-medium text-emerald-600 mb-3 tracking-wide uppercase">
          Morocco travel guide
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 leading-tight">
          Travel Morocco <br className="hidden md:block" />
          with confidence
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
          Compare transport prices, find taxi hubs, plan routes, and travel like a local — no more confusion or overcharging.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/prices"
            className="bg-emerald-600 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Compare prices
          </Link>
          <Link
            to="/routes"
            className="bg-white border border-gray-200 text-gray-700 text-sm font-medium px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Plan a route
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-xl font-semibold text-gray-900 mb-8 text-center">
          Everything you need to get around
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(feature => (
            <Link
              key={feature.path}
              to={feature.path}
              className="border border-gray-100 rounded-xl p-6 hover:border-emerald-200 hover:bg-emerald-50 transition-all group"
            >
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-emerald-700">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}