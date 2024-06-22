import { FastifyInstance } from 'fastify'
import { SessionsController } from '../controllers/SessionsControllers'

const sessionsController = new SessionsController()

export async function sessionsRoutes(app: FastifyInstance) {
  app.post('/singIn', sessionsController.create)
}
