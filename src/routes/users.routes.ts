import { FastifyInstance } from 'fastify'
import { UsersController } from '../controllers/UsersController'

const usersController = new UsersController()

export async function usersRoutes(app: FastifyInstance) {
  app.post('/singUp', usersController.create)
}
