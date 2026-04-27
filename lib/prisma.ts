import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from '@prisma/adapter-libsql'

const prismaClientSingleton = () => {
  let url = process.env.DATABASE_URL;

  try {
    const config = useRuntimeConfig();
    if (config?.databaseUrl) {
      url = config.databaseUrl;
    }
  } catch {
    // On ignore l'erreur si on n'est pas dans un contexte Nuxt (ex: scripts)
  }

  if (!url) {
    throw new Error("DATABASE_URL is not defined. Please check your .env file.");
  }

  const adapter = new PrismaLibSql({
    url: url,
  })
  return new PrismaClient({ adapter })
}

interface CustomNodeGlobal {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
}

const globalWithPrisma = globalThis as unknown as CustomNodeGlobal;

const prisma = globalWithPrisma.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalWithPrisma.prismaGlobal = prisma
