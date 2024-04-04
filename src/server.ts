import Fastify from 'fastify'
import cors from '@fastify/cors'
import { routes } from './routes'

const app = Fastify()

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
    await app
      .listen({
        host: '0.0.0.0',
        port: process.env.port ? Number(process.env.port) : 3333,
      })
      .then(() => {
        console.log('HTTP Server Running')
      })
  } catch (error) {
    process.exit(1)
  }
}

start()
