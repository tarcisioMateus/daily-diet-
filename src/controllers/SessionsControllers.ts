import { CreateService } from '../services/sessions/CreateService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class SessionsController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      email: z.string().email({ message: 'Invalid email address' }),
      password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' }),
    })
    const { email, password } = bodySchema.parse(request.body)

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
