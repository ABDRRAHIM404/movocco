export type TransportMethod = 'grand-taxi' | 'bus' | 'indrive'

export interface Route {
  id: string
  from: string
  to: string
  prices: {
    method: TransportMethod
    price: number
    duration: string
  }[]
}