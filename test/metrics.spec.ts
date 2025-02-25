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

  it('should be able to get the user metrics', async () => {
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

    for (let i = 10; i <= 15; i++) {
      await request(app.server)
        .post('/meals')
        .set('Cookie', cookies)
        .send({
          name: `glass of milk ${i}`,
          description: `cold ${i}`,
          date: '2025-02-13',
          time: `08:${10 + i}`,
          onDiet: true,
        })
    }
    for (let i = 16; i <= 20; i++) {
      await request(app.server)
        .post('/meals')
        .set('Cookie', cookies)
        .send({
          name: `glass of milk ${i}`,
          description: `cold ${i}`,
          date: '2025-02-13',
          time: `08:${10 + i}`,
          onDiet: false,
        })
    }
    for (let i = 21; i <= 30; i++) {
      await request(app.server)
        .post('/meals')
        .set('Cookie', cookies)
        .send({
          name: `glass of milk ${i}`,
          description: `cold ${i}`,
          date: '2025-02-13',
          time: `08:${10 + i}`,
          onDiet: true,
        })
    }

    const metricsResponse = await request(app.server)
      .get('/metrics')
      .set('Cookie', cookies)

    expect(metricsResponse.body).toEqual(
      expect.objectContaining({
        bestSequence: 10,
        amountOnDiet: 16,
        amountOutOfDiet: 5,
        totalAmount: 21,
      }),
    )
  })
})
