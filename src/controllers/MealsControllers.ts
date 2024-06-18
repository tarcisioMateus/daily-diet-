import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Meal } from '../repositories/MealsRepository'
import { getUserId } from '../utils/getUserId'

import { CreateService } from '../services/meals/CreateService'
import { UpdateService } from '../services/meals/UpdateService'
import { ShowService } from '../services/meals/ShowService'
import { DeleteService } from '../services/meals/DeleteService'

export class MealsController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string(),
      time: z.string(),
      onDiet: z.boolean(),
    })
    const { name, description, date, time, onDiet } = bodySchema.parse(
      request.body,
    )

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
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string(),
      time: z.string(),
      onDiet: z.boolean(),
    })
    const { name, description, date, time, onDiet } = bodySchema.parse(
      request.body,
    )

    const paramSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramSchema.parse(request.params)

    let userId: string
    try {
      userId = getUserId(request)
    } catch (error) {
      return reply.status(401).send({
        error: 'Unauthorized',
      })
    }

    const updateService = new UpdateService()
    try {
      await updateService.execute({
        name,
        description,
        date,
        time,
        onDiet,
        id,
        userId,
      })
    } catch (error) {
      return reply.status(404).send(error)
    }

    return reply.status(200).send()
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const paramSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramSchema.parse(request.params)

    let userId: string
    try {
      userId = getUserId(request)
    } catch (error) {
      return reply.status(401).send({
        error: 'Unauthorized',
      })
    }

    const showService = new ShowService()
    let meal: Meal
    try {
      meal = await showService.execute(id, userId)
    } catch (error) {
      return reply.status(404).send(error)
    }

    return reply.status(200).send(meal)
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const paramSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramSchema.parse(request.params)

    let userId: string
    try {
      userId = getUserId(request)
    } catch (error) {
      return reply.status(401).send({
        error: 'Unauthorized',
      })
    }

    const deleteService = new DeleteService()
    try {
      await deleteService.execute(id, userId)
    } catch (error) {
      return reply.status(404).send(error)
    }

    return reply.status(200).send()
  }
}
