import { Hono } from 'hono';
import { prisma } from '../db';
import * as bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

const authApp = new Hono();

authApp.post('/register', async (c) => {
  const { email, password, name } = await c.req.json();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return c.json({ error: 'Email already exists' }, 400);

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed, name },
    select: { id: true, email: true, name: true },
  });

  return c.json({ message: 'User registered', user });
});

authApp.post('/login', async (c) => {
  const { email, password } = await c.req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  const token = generateToken({ id: user.id, email: user.email });
  return c.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

export default authApp;