import { Hono } from 'hono';
import { prisma } from '../db';
import { authMiddleware } from '../middleware/auth';
const productApp = new Hono();
productApp.use('*', authMiddleware);
productApp.get('/', async (c) => {
    const products = await prisma.product.findMany();
    return c.json(products);
});
productApp.post('/', async (c) => {
    const data = await c.req.json();
    const product = await prisma.product.create({ data });
    return c.json(product, 201);
});
productApp.put('/:id', async (c) => {
    const id = parseInt(c.req.param('id'));
    const data = await c.req.json();
    const product = await prisma.product.update({
        where: { id },
        data,
    });
    return c.json(product);
});
productApp.delete('/:id', async (c) => {
    const id = parseInt(c.req.param('id'));
    await prisma.product.delete({ where: { id } });
    return c.json({ message: 'Product deleted' });
});
export default productApp;
