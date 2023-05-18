import { FastifyReply, FastifyRequest } from 'fastify'

/**
 *
 * @param request
 * @param reply
 */
export async function healthcheck(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  return reply.send({
    status: 'UP',
    version: process.env.VERSION || 'DEV',
  })
}
