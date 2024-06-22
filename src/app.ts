import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { routes } from './routes'

export const app = fastify()

app.register(cookie)
app.register(routes)
