import { CreateService } from '../services/users/CreateService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class UsersController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })
    const { name, email, password } = createUserBodySchema.parse(request.body)

    const createService = new CreateService()
    await createService.execute({
      name,
      email,
      password,
    })

    return reply.status(201)
  }
}
