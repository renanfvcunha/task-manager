import fastify from 'fastify'
import { taskRoutes } from './presentation/routes/task.routes.js'

const app = fastify({
  logger: true
})

app.register(taskRoutes)

async function start(): Promise<void> {
  try {
    await app.listen({ port: 3050 })
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

start()