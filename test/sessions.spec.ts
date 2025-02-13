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

describe('Sessions routes', () => {
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

  it('should be able to singIn', async () => {
    await request(app.server).post('/singUp').send({
      name: 'Mike',
      email: 'mike@gmail.com',
      password: 'abcd1234',
    })
    const response = await request(app.server).post('/singIn').send({
      email: 'mike@gmail.com',
      password: 'abcd1234',
    })
    expect(response.status).toBe(201)
  })

  it('should not be able to singIn with a wrong password', async () => {
    await request(app.server).post('/singUp').send({
      name: 'Mike',
      email: 'mike@gmail.com',
      password: 'abcd1234',
    })
    const response = await request(app.server).post('/singIn').send({
      email: 'mike@gmail.com',
      password: 'abcde12345',
    })
    expect(response.status).toBe(500)
    expect(response.body.message).toBe('wrong email or password')
  })
})
