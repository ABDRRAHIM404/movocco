import { createClient } from '@supabase/supabase-js'
import fetch, { RequestInfo, RequestInit } from 'node-fetch'
import { HttpsProxyAgent } from 'https-proxy-agent'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!

const agent = new HttpsProxyAgent('http://192.168.1.171:8080')

const proxiedFetch = (url: RequestInfo | URL, options?: RequestInit) =>
  fetch(url as RequestInfo, { ...options, agent })

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    fetch: proxiedFetch as unknown as typeof globalThis.fetch
  }
})