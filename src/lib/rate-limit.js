const BUCKETS = new Map();
const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_LIMIT = 5;
const MAX_KEYS = 5000;

export function rateLimit(key, { windowMs = DEFAULT_WINDOW_MS, limit = DEFAULT_LIMIT } = {}) {
  const now = Date.now();
  const existing = BUCKETS.get(key) || [];
  const recent = existing.filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    BUCKETS.set(key, recent);
    return { allowed: false, retryAfterMs: windowMs - (now - recent[0]) };
  }

  recent.push(now);
  BUCKETS.delete(key);
  BUCKETS.set(key, recent);

  if (BUCKETS.size > MAX_KEYS) {
    const oldest = BUCKETS.keys().next().value;
    if (oldest !== undefined) BUCKETS.delete(oldest);
  }

  return { allowed: true };
}
