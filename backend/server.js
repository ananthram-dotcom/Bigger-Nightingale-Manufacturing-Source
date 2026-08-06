import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import { connectDB } from './config/db.js';

// Middleware & Validation
import { apiLimiter, strictLimiter } from './middleware/rateLimiter.js';
import { validate } from './middleware/validate.js';
import { protect, adminOnly } from './middleware/authMiddleware.js';
import { contactSchema, chatSchema, registerSchema, loginSchema } from './validators/schemas.js';

// Route Handlers & Controllers
import { handleChat } from './controllers/chatController.js';
import { getProducts, getProductById } from './controllers/productController.js';
import { getPosts, getPostBySlugOrId } from './controllers/postController.js';
import { submitContact, getContacts } from './controllers/contactController.js';
import { registerUser, loginUser, getMe, toggleFavorite } from './controllers/authController.js';
import { seedDatabase } from './seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());
app.use(mongoSanitize());

// CORS setup
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10kb' }));

// Apply General Rate Limiter to all /api routes
app.use('/api', apiLimiter);

// Connect Database asynchronously
connectDB();

// Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    company: 'Bigger Nightingale Manufacturing',
    motto: 'Big ideas, beautiful design.',
    security: 'Hardened with Helmet, Zod & Rate Limiter',
    timestamp: new Date().toISOString()
  });
});

// Auth Routes
app.post('/api/auth/register', validate(registerSchema), registerUser);
app.post('/api/auth/login', validate(loginSchema), loginUser);
app.get('/api/auth/me', protect, getMe);
app.post('/api/auth/favorites', protect, toggleFavorite);

// AI Chatbot (Strict Limiter + Zod Validation)
app.post('/api/chat', strictLimiter, validate(chatSchema), handleChat);

// Products
app.get('/api/products', getProducts);
app.get('/api/products/:id', getProductById);

// Posts
app.get('/api/posts', getPosts);
app.get('/api/posts/:id', getPostBySlugOrId);

// Contact (Strict Limiter + Zod Validation for Submit; Admin Protection for Get)
app.post('/api/contact', strictLimiter, validate(contactSchema), submitContact);
app.get('/api/contact', protect, adminOnly, getContacts);

// Database Seeding (Admin Protected)
app.post('/api/seed', protect, adminOnly, async (req, res) => {
  const success = await seedDatabase();
  if (success) {
    res.json({ message: 'Database seeded successfully!' });
  } else {
    res.status(500).json({ message: 'Failed to seed database or MONGO_URI not provided.' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Bigger Nightingale Manufacturing Express Backend Server Running');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('🔥 Global Server Error:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    environment: process.env.NODE_ENV === 'development' ? 'development' : 'production'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Bigger Nightingale Backend running on port ${PORT}`);
  console.log(` Security: Hardened with Helmet, Express-Rate-Limit, Zod & JWT Auth`);
});
