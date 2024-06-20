import { FastifyReply, FastifyRequest } from 'fastify'

import { getUserId } from '../utils/getUserId'

import { ShowService, MealsMetrics } from '../services/metrics/ShowService'

export class MetricsController {
  async show(request: FastifyRequest, reply: FastifyReply) {
    let userId: string
    try {
      userId = getUserId(request)
    } catch (error) {
      return reply.status(401).send({
        error: 'Unauthorized',
      })
    }

    const showService = new ShowService()
    let metrics: MealsMetrics
    try {
      metrics = await showService.execute(userId)
    } catch (error) {
      return reply.status(404).send(error)
    }

    return reply.status(200).send(metrics)
  }
}
