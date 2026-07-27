import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

// Route Handlers & Controllers
import { handleChat } from './controllers/chatController.js';
import { getProducts, getProductById } from './controllers/productController.js';
import { getPosts, getPostBySlugOrId } from './controllers/postController.js';
import { submitContact, getContacts } from './controllers/contactController.js';
import { seedDatabase } from './seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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
      callback(null, true); // Permissive CORS for public API endpoints
    }
  },
  credentials: true
}));

app.use(express.json());

// Connect Database asynchronously
connectDB();

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    company: 'Bigger Nightingale Manufacturing',
    motto: 'Big ideas, beautiful design. I am using Antigravity by the way.',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/chat', handleChat);

app.get('/api/products', getProducts);
app.get('/api/products/:id', getProductById);

app.get('/api/posts', getPosts);
app.get('/api/posts/:id', getPostBySlugOrId);

app.post('/api/contact', submitContact);
app.get('/api/contact', getContacts);

app.post('/api/seed', async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`🚀 Bigger Nightingale Backend running on port ${PORT}`);
  console.log(` Tagline: "Big ideas, beautiful design. I am using Antigravity by the way."`);
});
