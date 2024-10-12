import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const db = globalForPrisma.prisma || new PrismaClient();

export default db;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
