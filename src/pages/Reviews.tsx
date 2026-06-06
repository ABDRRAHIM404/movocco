import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Badge from '../components/ui/Badge'

interface Review {
  id: string
  author: string
  location: string
  rating: number
  date: string
  transport: string
  route: string
  comment: string
}

const initialReviews: Review[] = [
  {
    id: '1',
    author: 'Sarah M.',
    location: 'UK',
    rating: 5,
    date: 'May 2025',
    transport: 'Grand Taxi',
    route: 'Agadir → Essaouira',
    comment: 'Smooth ride, driver was friendly and the price was exactly what Movocco said. Highly recommend booking the full taxi if you have a group.',
  },
  {
    id: '2',
    author: 'Lucas B.',
    location: 'France',
    rating: 4,
    date: 'April 2025',
    transport: 'CTM Bus',
    route: 'Marrakech → Casablanca',
    comment: 'Very comfortable bus, air conditioned and on time. Bought my ticket the day before with no issues. Only downside was the station was hard to find.',
  },
  {
    id: '3',
    author: 'Amara D.',
    location: 'USA',
    rating: 5,
    date: 'March 2025',
    transport: 'InDrive',
    route: 'Agadir → Marrakech',
    comment: 'Used InDrive for the first time in Morocco and it was great. Negotiated a fair price in the app and the driver was professional the whole way.',
  },
  {
    id: '4',
    author: 'Tom W.',
    location: 'Germany',
    rating: 3,
    date: 'February 2025',
    transport: 'Grand Taxi',
    route: 'Marrakech → Essaouira',
    comment: 'Waited almost an hour for the taxi to fill up. Once moving it was fine but the wait was frustrating. Worth knowing this can happen.',
  },
]

const transportOptions = ['Grand Taxi', 'Petit Taxi', 'CTM Bus', 'Supratours Bus', 'InDrive']

function StarRating({ rating, onChange }: { rating: number; onChange?: (r: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          className={`text-xl transition-colors ${
            star <= rating ? 'text-amber-400' : 'text-gray-200'
          } ${onChange ? 'hover:text-amber-300 cursor-pointer' : 'cursor-default'}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    author: '', location: '', transport: '', route: '', rating: 0, comment: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() {
    if (!form.author || !form.transport || !form.route || !form.rating || !form.comment) return
    const newReview: Review = {
      id: Date.now().toString(),
      author: form.author,
      location: form.location,
      rating: form.rating,
      date: 'Just now',
      transport: form.transport,
      route: form.route,
      comment: form.comment,
    }
    setReviews([newReview, ...reviews])
    setForm({ author: '', location: '', transport: '', route: '', rating: 0, comment: '' })
    setShowForm(false)
    setSubmitted(true)
  }

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-start justify-between mb-8">
        <PageHeader
          title="Reviews"
          description="Real experiences from travelers across Morocco."
        />
        <button
          onClick={() => { setShowForm(!showForm); setSubmitted(false) }}
          className="bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shrink-0 mt-1"
        >
          {showForm ? 'Cancel' : '+ Add review'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-400 mb-1">Average rating</p>
          <p className="text-3xl font-semibold text-gray-900">{avgRating}</p>
          <StarRating rating={Math.round(Number(avgRating))} />
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-400 mb-1">Total reviews</p>
          <p className="text-3xl font-semibold text-gray-900">{reviews.length}</p>
          <p className="text-xs text-gray-400 mt-1">from travelers worldwide</p>
        </div>
      </div>

      {submitted && (
        <div className="border border-emerald-200 bg-emerald-50 rounded-xl px-4 py-3 mb-6 text-sm text-emerald-700">
          ✓ Thanks for your review — it's been added!
        </div>
      )}

      {showForm && (
        <div className="border border-gray-100 rounded-xl p-5 mb-8">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Share your experience</h2>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Your name</label>
                <input
                  type="text"
                  placeholder="e.g. Sarah M."
                  value={form.author}
                  onChange={e => setForm({ ...form, author: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Country</label>
                <input
                  type="text"
                  placeholder="e.g. UK"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Transport used</label>
                <select
                  value={form.transport}
                  onChange={e => setForm({ ...form, transport: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="">Select transport</option>
                  {transportOptions.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Route</label>
                <input
                  type="text"
                  placeholder="e.g. Agadir → Marrakech"
                  value={form.route}
                  onChange={e => setForm({ ...form, route: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Rating</label>
              <StarRating rating={form.rating} onChange={r => setForm({ ...form, rating: r })} />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Your experience</label>
              <textarea
                rows={3}
                placeholder="Tell other travelers what to expect..."
                value={form.comment}
                onChange={e => setForm({ ...form, comment: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-emerald-400 resize-none"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!form.author || !form.transport || !form.route || !form.rating || !form.comment}
              className="w-full bg-emerald-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit review
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {reviews.map(review => (
          <div key={review.id} className="border border-gray-100 rounded-xl p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold flex items-center justify-center shrink-0">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{review.author}</p>
                  <p className="text-xs text-gray-400">{review.location} · {review.date}</p>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <div className="flex gap-2 mb-3">
              <Badge label={review.transport} color="green" />
              <Badge label={review.route} color="gray" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}