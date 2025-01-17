import {
  expect,
  it,
  beforeAll,
  afterAll,
  describe,
  beforeEach,
  afterEach,
} from 'vitest'
import { spawn } from 'node:child_process'
import request from 'supertest'
import { app } from '../src/app'

describe('Users routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    spawn('npm', ['run', 'knex', '--', 'migrate:latest'])
    spawn('npm', ['run', 'knex', '--', 'migrate:rollback', 'all'])
  })

  it('should be able to create a new user', async () => {
    const response = await request(app.server).post('/singUp').send({
      name: 'Mike',
      email: 'mike@gmail.com',
      password: 'abc123',
    })
    console.log(response.body)
    expect(response.status).toBe(201)
  })
})
