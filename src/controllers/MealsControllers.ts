import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { getUserId } from '../utils/getUserId'
import { CreateService } from '../services/meals/CreateService'
import { UpdateService } from '../services/meals/UpdateService'

export class MealsController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string(),
      time: z.string(),
      onDiet: z.boolean(),
    })
    const { name, description, date, time, onDiet } =
      createMealBodySchema.parse(request.body)

    let userId: string
    try {
      userId = getUserId(request)
    } catch (error) {
      return reply.status(401).send({
        error: 'Unauthorized',
      })
    }

    const createService = new CreateService()
    await createService.execute({
      name,
      description,
      date,
      time,
      onDiet,
      userId,
    })

    return reply.status(201).send()
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const updateMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string(),
      time: z.string(),
      onDiet: z.boolean(),
    })
    const { name, description, date, time, onDiet } =
      updateMealBodySchema.parse(request.body)

    const updateMealParamSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = updateMealParamSchema.parse(request.params)

    const updateService = new UpdateService()
    try {
      await updateService.execute({
        name,
        description,
        date,
        time,
        onDiet,
        id,
      })
    } catch (error) {
      return reply.status(404).send(error)
    }

    return reply.status(200).send()
  }
}
