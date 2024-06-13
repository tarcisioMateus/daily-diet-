import { CreateService } from '../services/sessions/CreateService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class SessionsController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
      email: z.string(),
      password: z.string(),
    })
    const { email, password } = createUserBodySchema.parse(request.body)

    const createService = new CreateService()
    const { token, user } = await createService.execute({
      email,
      password,
    })

    reply.cookie('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 1, // 1 day
    })

    return reply.status(201).send({ user })
  }
}
