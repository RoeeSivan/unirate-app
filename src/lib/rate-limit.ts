const requests = new Map<string, { count: number; resetAt: number }>()

// Clean up expired entries periodically to prevent memory leaks
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of requests) {
    if (now > value.resetAt) {
      requests.delete(key)
    }
  }
}, 60_000)

/**
 * Simple in-memory rate limiter.
 * Returns { success: true } if allowed, { success: false } if rate limited.
 */
export function rateLimit(
  key: string,
  { maxRequests, windowMs }: { maxRequests: number; windowMs: number }
): { success: boolean } {
  const now = Date.now()
  const entry = requests.get(key)

  if (!entry || now > entry.resetAt) {
    requests.set(key, { count: 1, resetAt: now + windowMs })
    return { success: true }
  }

  if (entry.count >= maxRequests) {
    return { success: false }
  }

  entry.count++
  return { success: true }
}
