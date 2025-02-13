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

  it('should be able to create a meal', async () => {
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

  describe('create meal input validation', () => {
    it.only('should not be able to create a meal with invalid input', async () => {
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

      const responseWithoutName = await request(app.server)
        .post('/meals')
        .set('Cookie', cookies)
        .send({
          name: '',
          description: 'cold',
          date: '2025-02-13',
          time: '08:51',
          onDiet: true,
        })
      expect(
        responseWithoutName.body.message.includes('Must not be empty'),
      ).toBe(true)

      const responseWithoutDescription = await request(app.server)
        .post('/meals')
        .set('Cookie', cookies)
        .send({
          name: 'glass of milk',
          description: '',
          date: '2025-02-13',
          time: '08:51',
          onDiet: true,
        })
      expect(
        responseWithoutDescription.body.message.includes('Must not be empty'),
      ).toBe(true)

      const responseWithWrongDateFormate = await request(app.server)
        .post('/meals')
        .set('Cookie', cookies)
        .send({
          name: 'glass of milk',
          description: 'cold',
          date: '13-02-2025',
          time: '08:51',
          onDiet: true,
        })
      expect(
        responseWithWrongDateFormate.body.message.includes(
          'String must be in the format YYYY-MM-DD (e.g., 2023-10-05)',
        ),
      ).toBe(true)

      const responseWithWrongTimeFormate = await request(app.server)
        .post('/meals')
        .set('Cookie', cookies)
        .send({
          name: 'glass of milk',
          description: 'cold',
          date: '2025-13-02',
          time: '08:51:16',
          onDiet: true,
        })
      expect(
        responseWithWrongTimeFormate.body.message.includes(
          'String must be in the format HH:MM (e.g., 12:34)',
        ),
      ).toBe(true)
    })
  })
})
