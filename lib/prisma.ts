import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const prismaClientSingleton = () => {
  let url = process.env.DATABASE_URL;

  try {
    const config = useRuntimeConfig();
    if (config?.databaseUrl) {
      url = config.databaseUrl;
    }
  } catch {
    // Ignore error if not in Nuxt context (e.g., scripts)
  }

  if (!url) {
    throw new Error("DATABASE_URL is not defined. Please check your .env file.");
  }

  const pool = new pg.Pool({ connectionString: url })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

interface CustomNodeGlobal {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
}

const globalWithPrisma = globalThis as unknown as CustomNodeGlobal;

const prisma = globalWithPrisma.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalWithPrisma.prismaGlobal = prisma
