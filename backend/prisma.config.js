import path from 'node:path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  migrations: {
    path: path.join('src', 'infrastructure', 'database', 'prisma', 'migrations')
  }
})