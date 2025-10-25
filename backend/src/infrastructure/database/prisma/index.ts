import { PrismaClient } from "generated/prisma-client/index.js"

const db = new PrismaClient()

export { db }