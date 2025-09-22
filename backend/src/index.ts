import fastify from 'fastify'

const app = fastify({
  logger: true
})

async function start(): Promise<void> {
  try {
    await app.listen({ port: 3050 })
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

start()