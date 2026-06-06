import { Router } from 'express'
import { supabase } from '../lib/supabase'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const { data: routes, error } = await supabase
      .from('routes')
      .select(`
        id,
        from_city,
        to_city,
        route_prices (
          method,
          price,
          duration
        )
      `)

    if (error) throw error
    res.json(routes)
  } catch  {
    res.status(500).json({ error: 'Failed to fetch routes' })
  }
})

export default router