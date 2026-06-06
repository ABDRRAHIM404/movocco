import { Router } from 'express'
import { supabase } from '../lib/supabase'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const { data: hubs, error } = await supabase
      .from('transport_hubs')
      .select(`
        id,
        name,
        city,
        address,
        type,
        notes,
        hub_destinations (
          destination
        )
      `)

    if (error) throw error
    res.json(hubs)
  } catch {
    res.status(500).json({ error: 'Failed to fetch hubs' })
  }
})

export default router