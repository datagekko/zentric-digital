import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { NextRequest } from "next/server";

// Create a simple in-memory rate limiter for development
const ipRequests: Record<string, { count: number, timestamp: number }> = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds
const RATE_LIMIT_MAX = 5; // 5 requests per minute

// Check if Upstash Redis credentials are available
const hasUpstashCredentials = 
  process.env.UPSTASH_REDIS_REST_URL && 
  process.env.UPSTASH_REDIS_REST_TOKEN &&
  !process.env.UPSTASH_REDIS_REST_URL.includes('your-region');

// Create Redis client only if credentials are properly configured
const redis = hasUpstashCredentials 
  ? Redis.fromEnv()
  : null;

// Create a rate limiter using Upstash Redis if available, otherwise use in-memory
export const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      analytics: true,
    })
  : {
      limit: async (key: string) => {
        const now = Date.now();
        const ip = key.split('_')[2] || key;
        
        // Initialize or reset expired record
        if (!ipRequests[ip] || (now - ipRequests[ip].timestamp) > RATE_LIMIT_WINDOW) {
          ipRequests[ip] = { count: 0, timestamp: now };
        }
        
        // Increment request count
        ipRequests[ip].count++;
        
        // Check if over limit
        const remaining = Math.max(0, RATE_LIMIT_MAX - ipRequests[ip].count);
        const success = ipRequests[ip].count <= RATE_LIMIT_MAX;
        
        return {
          success,
          limit: RATE_LIMIT_MAX,
          remaining,
          reset: ipRequests[ip].timestamp + RATE_LIMIT_WINDOW,
        };
      }
    };

// Helper function to get client IP from request
export function getClientIp(request: NextRequest): string {
  // Try to get the IP from X-Forwarded-For header (used by Vercel)
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }

  // Fallback to other headers
  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp) {
    return xRealIp;
  }

  // Final fallback
  return "127.0.0.1"; // localhost as fallback
} 