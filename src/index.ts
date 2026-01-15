import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';

const app = new Hono();

app.route('/auth', authRoutes);
app.route('/products', productRoutes);

app.get('/', (c) => c.text('Backend OK'));

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = 3000;
  console.log(`🚀 Server running on http://localhost:${port}`);
  serve({ fetch: app.fetch, port });
}

// For Vercel
export default app;