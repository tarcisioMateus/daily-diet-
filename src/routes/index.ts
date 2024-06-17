import { FastifyInstance } from 'fastify'
import { usersRoutes } from './users.routes'
import { sessionsRoutes } from './sessions.routes'
import { mealsRoutes } from './meals.routes'

export async function routes(app: FastifyInstance) {
  app.register(usersRoutes)
  app.register(sessionsRoutes)
  app.register(mealsRoutes, {
    prefix: 'meals',
  })
}
