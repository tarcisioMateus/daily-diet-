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

describe('Users routes', () => {
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

  it('should be able to create a new user', async () => {
    const response = await request(app.server).post('/singUp').send({
      name: 'Mike',
      email: 'mike@gmail.com',
      password: 'abcd1234',
    })
    expect(response.status).toBe(201)
  })

  it('should not be able to create two users with the same email', async () => {
    await request(app.server).post('/singUp').send({
      name: 'Mike',
      email: 'mike@gmail.com',
      password: 'abcd1234',
    })
    const response = await request(app.server).post('/singUp').send({
      name: 'Mike',
      email: 'mike@gmail.com',
      password: 'abcd1234',
    })
    expect(response.status).toBe(500)
    expect(response.body.message).toBe('Email already in use!')
  })

  it('should not be able to create an user without an email', async () => {
    const response = await request(app.server).post('/singUp').send({
      name: 'Mike',
      email: '',
      password: 'abcd1234',
    })
    expect(response.body.message.includes('Invalid email address')).toBe(true)
  })

  it('should not be able to create an user without a name', async () => {
    const response = await request(app.server).post('/singUp').send({
      name: '',
      email: 'mike@gmail.com',
      password: 'abcd1234',
    })
    expect(response.body.message.includes('Name must not be empty')).toBe(true)
  })

  it('should not be able to create an user without a password', async () => {
    const response = await request(app.server).post('/singUp').send({
      name: 'Mike',
      email: 'mike@gmail.com',
      password: '',
    })
    expect(
      response.body.message.includes(
        'Password must be at least 8 characters long',
      ),
    ).toBe(true)
  })

  it('should not be able to create an user with a password with less than 8 characters', async () => {
    const response = await request(app.server).post('/singUp').send({
      name: 'Mike',
      email: 'mike@gmail.com',
      password: 'abc1234',
    })
    expect(
      response.body.message.includes(
        'Password must be at least 8 characters long',
      ),
    ).toBe(true)
  })
})
