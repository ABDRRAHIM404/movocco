import { Router } from 'express'
import { supabase } from '../lib/supabase'

const router = Router()

router.get('/', async (_req, res) => {
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Reviews error:', error)
    res.status(500).json({ error: error.message })
    return
  }

  res.json(reviews)
})

router.post('/', async (req, res) => {
  const { author, location, rating, transport, route, comment } = req.body

  if (!author || !rating || !transport || !route || !comment) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }

  const { data, error } = await supabase
    .from('reviews')
    .insert([{ author, location, rating, transport, route, comment }])
    .select()
    .single()

  if (error) {
    console.error('Insert review error:', error)
    res.status(500).json({ error: error.message })
    return
  }

  res.status(201).json(data)
})

export default router