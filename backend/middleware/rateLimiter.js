import rateLimit from 'express-rate-limit';

// Standard rate limiter for general API routes (100 requests per 15 minutes)
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});

// Strict rate limiter for AI Chat & Contact Submissions (10 requests per 15 minutes)
export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Rate limit exceeded for this endpoint. Please wait before submitting again.'
  }
});
