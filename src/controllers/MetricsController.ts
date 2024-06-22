import { FastifyReply, FastifyRequest } from 'fastify'

import { ShowService, MealsMetrics } from '../services/metrics/ShowService'

export class MetricsController {
  async show(request: FastifyRequest, reply: FastifyReply) {
    if (!request.userId) return

    const showService = new ShowService()
    let metrics: MealsMetrics
    try {
      metrics = await showService.execute(request.userId)
    } catch (error) {
      return reply.status(404).send(error)
    }

    return reply.status(200).send(metrics)
  }
}
