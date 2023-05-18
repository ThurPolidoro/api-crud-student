import { FastifyInstance } from 'fastify'

import { healthcheck } from './routes/healthcheck'
import { studentRoutes } from './routes/studentRoutes';

/**
 *
 * @param app
 */
export async function routes(app: FastifyInstance) {
  app.get('/healthcheck', healthcheck);

  // Carregar rotas automaticamente do diretório 'student'
  app.register(studentRoutes, { prefix: '/v1/student' });
}