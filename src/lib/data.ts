import type { Route } from '../types'

export const routes: Route[] = [
  {
    id: '1',
    from: 'Agadir',
    to: 'Marrakech',
    prices: [
      { method: 'grand-taxi', price: 80, duration: '3h' },
      { method: 'bus', price: 60, duration: '3h 30m' },
      { method: 'indrive', price: 120, duration: '2h 45m' },
    ],
  },
  {
    id: '2',
    from: 'Agadir',
    to: 'Essaouira',
    prices: [
      { method: 'grand-taxi', price: 50, duration: '2h 30m' },
      { method: 'bus', price: 35, duration: '3h' },
      { method: 'indrive', price: 80, duration: '2h 15m' },
    ],
  },
  {
    id: '3',
    from: 'Marrakech',
    to: 'Casablanca',
    prices: [
      { method: 'grand-taxi', price: 100, duration: '3h 30m' },
      { method: 'bus', price: 70, duration: '4h' },
      { method: 'indrive', price: 150, duration: '3h' },
    ],
  },
  {
    id: '4',
    from: 'Agadir',
    to: 'Imsouane',
    prices: [
      { method: 'grand-taxi', price: 30, duration: '1h 15m' },
      { method: 'bus', price: 20, duration: '1h 45m' },
      { method: 'indrive', price: 50, duration: '1h' },
    ],
  },
  {
    id: '5',
    from: 'Marrakech',
    to: 'Essaouira',
    prices: [
      { method: 'grand-taxi', price: 60, duration: '2h 30m' },
      { method: 'bus', price: 40, duration: '3h' },
      { method: 'indrive', price: 90, duration: '2h 15m' },
    ],
  },
]

export const cities = [...new Set(routes.flatMap(r => [r.from, r.to]))].sort()