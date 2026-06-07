const BASE_URL = 'https://movocco-production.up.railway.app/api'

export async function fetchRoutes() {
  const res = await fetch(`${BASE_URL}/routes`)
  if (!res.ok) throw new Error('Failed to fetch routes')
  return res.json()
}

export async function fetchHubs() {
  const res = await fetch(`${BASE_URL}/hubs`)
  if (!res.ok) throw new Error('Failed to fetch hubs')
  return res.json()
}

export async function fetchReviews() {
  const res = await fetch(`${BASE_URL}/reviews`)
  if (!res.ok) throw new Error('Failed to fetch reviews')
  return res.json()
}

export async function submitReview(data: {
  author: string
  location: string
  rating: number
  transport: string
  route: string
  comment: string
}) {
  const res = await fetch(`${BASE_URL}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to submit review')
  return res.json()
}