import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import authConfig from '../configs/auth'

export async function validateAndSetUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { token } = request.cookies

  if (!token) {
    return reply.status(401).send({
      error: 'Unauthorized',
    })
  }

  const { sub } = jwt.verify(token, authConfig.jwt.secret)
  const outputSchema = z.string().uuid()
  request.userId = outputSchema.parse(sub)
}
