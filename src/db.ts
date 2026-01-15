import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('❌ DATABASE_URL is missing in .env');
}

// Buat adapter
const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter, // ← Lewatkan adapter ke PrismaClient
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;