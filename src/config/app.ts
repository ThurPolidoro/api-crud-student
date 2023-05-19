import fastify from 'fastify'
import { ZodError } from 'zod'

import { routes } from '@/api/routes'
import { InvalidValueError } from '@/errors/InvalidValueError'

export const app = fastify()

app.register(routes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ success: false, message: 'Validation error.', issues: error.format() })
  }

  if(error instanceof InvalidValueError) {
    return reply
      .status(400)
      .send({ success: false, message: error.message});
  }

  return reply.status(500).send({ success: false, message: error.message });
})
