import { FastifyInstance } from 'fastify'
import { MetricsController } from '../controllers/MetricsController'
import { checkTokenExists } from '../middlewares/checkTokenExists'

const metricsController = new MetricsController()

export async function metricsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', checkTokenExists)
  app.get('/', metricsController.show)
}
