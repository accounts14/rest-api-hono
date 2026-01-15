import { Hono } from 'hono';
import { prisma } from '../db';
import { authMiddleware } from '../middleware/auth';
import type { UserPayload } from '../types/context';


const productApp = new Hono<{
  Variables: {
    user: UserPayload
  }
}>()


productApp.use('*', authMiddleware);

// GET semua produk
productApp.get('/', async (c) => {
  const products = await prisma.product.findMany({
    include: {
      user: {
        select: { id: true, name: true, email: true }
      }
    }
  });
  return c.json(products);
});

// POST ambil userId dari token
productApp.post('/', async (c) => {
  const user = c.get('user') // ✅ inferred UserPayload

  const body = await c.req.json()
  const { name, description, price } = body

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      userId: user.id,
    },
  })

  return c.json(product, 201)
})


// PUT  
productApp.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await c.req.json();
  const product = await prisma.product.update({
    where: { id },
    data,
  });
  return c.json(product);
});


// DELETE
productApp.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await prisma.product.delete({ where: { id } });
  return c.json({ message: 'Product deleted' });
});

export default productApp;