import { FastifyInstance } from 'fastify'
import { MealsController } from '../controllers/MealsControllers'
import { checkTokenExists } from '../middlewares/checkTokenExists'

const mealsController = new MealsController()

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', checkTokenExists)
  app.post('/', mealsController.create)
}
