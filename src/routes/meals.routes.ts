import { FastifyInstance } from 'fastify'
import { MealsController } from '../controllers/MealsControllers'
import { validateAndSetUserId } from '../middlewares/validateAndSetUserId'

const mealsController = new MealsController()

export async function mealsRoutes(app: FastifyInstance) {
  app.decorateRequest('userId', '')
  app.addHook('onRequest', validateAndSetUserId)

  app.post('/', mealsController.create)
  app.put('/:id', mealsController.update)
  app.delete('/:id', mealsController.delete)
  app.get('/:id', mealsController.show)
  app.get('/', mealsController.list)
}
