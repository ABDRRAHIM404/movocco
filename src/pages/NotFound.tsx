import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-24 text-center">
      <p className="text-6xl font-semibold text-emerald-200 mb-4">404</p>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Page not found</h1>
      <p className="text-gray-500 text-sm max-w-sm mb-8">
        Looks like this route doesn't exist — let's get you back on track.
      </p>
      <Link
        to="/"
        className="bg-emerald-600 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
      >
        Back to home
      </Link>
    </div>
  )
}