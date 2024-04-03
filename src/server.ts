import Fastify from 'fastify'
import cors from '@fastify/cors'
import { routes } from './routes'

const app = Fastify({ logger: true })

app.setErrorHandler((error, request, reply) => {
  reply.code(500).send({ message: error.message })
})

app.setNotFoundHandler((error, reply) => {
  reply.code(404).send({ message: 'Rota não encontrada.' })
})

const start = async () => {
  try {
    await app.register(cors)
    await app.register(routes)
    await app.listen({ port: 3333, host: '192.168.68.110' })
  } catch (error) {
    process.exit(1)
  }
}

start()
