import {
  expect,
  it,
  beforeAll,
  afterAll,
  describe,
  beforeEach,
  afterEach,
} from 'vitest'
import { spawnSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../src/app'
import { z } from 'zod'

describe('Meals routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    spawnSync('npm', ['run', 'knex', '--', 'migrate:latest'], {
      stdio: 'inherit',
    })
  })

  afterEach(async () => {
    spawnSync('npm', ['run', 'knex', '--', 'migrate:rollback', 'all'], {
      stdio: 'inherit',
    })
  })

  it.only('should be able to singIn', async () => {
    await request(app.server).post('/singUp').send({
      name: 'Mike',
      email: 'mike@gmail.com',
      password: 'abcd1234',
    })
    const singInResponse = await request(app.server).post('/singIn').send({
      email: 'mike@gmail.com',
      password: 'abcd1234',
    })

    const cookies = z.coerce.string().parse(singInResponse.get('Set-Cookie'))

    const createMealResponse = await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'glass of milk',
        description: 'cold',
        date: '2025-02-13',
        time: '08:51',
        onDiet: true,
      })

    expect(createMealResponse.status).toBe(201)
  })
})
