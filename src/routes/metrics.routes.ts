import { FastifyInstance } from 'fastify'
import { MetricsController } from '../controllers/MetricsController'
import { validateAndSetUserId } from '../middlewares/validateAndSetUserId'

const metricsController = new MetricsController()

export async function metricsRoutes(app: FastifyInstance) {
  app.decorateRequest('userId', '')
  app.addHook('onRequest', validateAndSetUserId)
  app.get('/', metricsController.show)
}
