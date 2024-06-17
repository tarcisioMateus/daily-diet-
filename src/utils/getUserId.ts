import { FastifyRequest } from 'fastify'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import authConfig from '../configs/auth'

export function getUserId(request: FastifyRequest): string {
  const { token } = request.cookies
  if (!token) throw new Error('Unauthorized')

  const { sub } = jwt.verify(token, authConfig.jwt.secret)
  const outputSchema = z.string().uuid()
  const userId = outputSchema.parse(sub)

  return userId
}
