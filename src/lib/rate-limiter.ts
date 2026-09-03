/**
 * In-memory sliding window rate limiter for API endpoints.
 * Easily replaceable with Redis / Upstash in production by swapping the store.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const ipRequestMap = new Map<string, RateLimitRecord>();

// Clean up stale IP records every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    ipRequestMap.forEach((record, ip) => {
      record.timestamps = record.timestamps.filter((ts) => now - ts < 60000);
      if (record.timestamps.length === 0) {
        ipRequestMap.delete(ip);
      }
    });
  }, 300000);
}

export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 60000
): { success: boolean; remaining: number } {
  const now = Date.now();
  const record = ipRequestMap.get(ip) || { timestamps: [] };

  // Filter timestamps within current window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= limit) {
    return { success: false, remaining: 0 };
  }

  record.timestamps.push(now);
  ipRequestMap.set(ip, record);

  return {
    success: true,
    remaining: limit - record.timestamps.length,
  };
}
