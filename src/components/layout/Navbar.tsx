import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const links = [
  { label: 'Home', path: '/' },
  { label: 'Prices', path: '/prices' },
  { label: 'Route planner', path: '/routes' },
  { label: 'Hubs', path: '/hubs' },
  { label: 'Vehicle guide', path: '/vehicles' },
  { label: 'Reviews', path: '/reviews' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">

        <Link to="/" className="text-xl font-semibold text-emerald-600 tracking-tight">
          Movocco
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm transition-colors ${
                pathname === link.path
                  ? 'text-emerald-600 font-medium'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-500 hover:text-gray-900"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-3">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`text-sm ${
                pathname === link.path
                  ? 'text-emerald-600 font-medium'
                  : 'text-gray-500'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}