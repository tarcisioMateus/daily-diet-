import { knex } from '../database/knex'
import { z } from 'zod'
import { randomUUID } from 'crypto'

export interface UserInput {
  name: string
  email: string
  password: string
}

export interface UserOutput {
  id: string
  name: string
  email: string
  password: string
  created_at: string
}

export class UsersRepository {
  async create(userInput: UserInput): Promise<void> {
    const userSchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })
    const { name, email, password } = userSchema.parse(userInput)

    await knex('users').insert({
      name,
      email,
      password,
      id: randomUUID(),
    })
  }

  async findByEmail(email: string): Promise<UserOutput | undefined> {
    const inputSchema = z.string()
    const email_ = inputSchema.parse(email)

    const user = await knex('users').where({ email: email_ }).first()

    return user
  }

  async findById(id: string): Promise<UserOutput | undefined> {
    const inputSchema = z.string().uuid()
    const id_ = inputSchema.parse(id)

    const user = await knex('users').where({ id: id_ }).first()

    return user
  }
}
