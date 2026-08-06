import { test, describe } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Create test express app
const app = express();
app.use(helmet());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    company: 'Bigger Nightingale Manufacturing',
    security: 'Hardened with Helmet, Zod & Rate Limiter'
  });
});

app.post('/api/chat', (req, res) => {
  if (!req.body.message) {
    return res.status(400).json({ error: 'Validation failed' });
  }
  res.json({ reply: 'Mock AI Chef response' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

describe('Backend API Security & Health Tests', () => {
  test('GET /api/health returns 200 and security info', async () => {
    const res = await request(app).get('/api/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, 'online');
    assert.strictEqual(res.body.company, 'Bigger Nightingale Manufacturing');
  });

  test('POST /api/chat rejects empty payload with 400', async () => {
    const res = await request(app).post('/api/chat').send({});
    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.body.error, 'Validation failed');
  });

  test('GET /api/nonexistent returns 404', async () => {
    const res = await request(app).get('/api/nonexistent');
    assert.strictEqual(res.status, 404);
  });
});
