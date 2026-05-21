import { LRUCache } from 'lru-cache'

const cache = new LRUCache<string, number[]>({
  max: 500,
  ttl: 60_000, // 1 minute window
})

/**
 * Returns true if the request is allowed, false if the limit is exceeded.
 * @param ip  — identifier (IP address or any unique token)
 * @param limit — max requests per minute
 */
export function checkRateLimit(ip: string, limit = 5): boolean {
  const now = Date.now()
  const timestamps = (cache.get(ip) ?? []).filter(t => now - t < 60_000)

  if (timestamps.length >= limit) return false

  timestamps.push(now)
  cache.set(ip, timestamps)
  return true
}
