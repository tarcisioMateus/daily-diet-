import { CreateService } from '../services/users/CreateService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class UsersController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      name: z.string().min(1, { message: 'Name must not be empty' }),
      email: z.string().email({ message: 'Invalid email address' }),
      password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' }),
    })
    const { name, email, password } = bodySchema.parse(request.body)

    const createService = new CreateService()
    await createService.execute({
      name,
      email,
      password,
    })

    return reply.status(201).send()
  }
}
