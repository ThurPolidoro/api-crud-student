import fastify from 'fastify'
import { ZodError } from 'zod'

import { routes } from '@/api/routes'

export const app = fastify()

app.register(routes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  const errorCode = (error.statusCode) ? Number(error.statusCode) : 500;

  return reply.status(errorCode).send({ message: error.message })
})
