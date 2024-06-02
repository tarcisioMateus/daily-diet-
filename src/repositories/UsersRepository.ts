import { knex } from '../database/knex'
import { z } from 'zod'
import { randomUUID } from 'crypto'

interface UserInput {
  name: string
  email: string
  password: string
}

class UserRepository {
  async create(userInput: UserInput): Promise<number> {
    const userSchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })
    const { name, email, password } = userSchema.parse(userInput)

    const [currentEntry] = await knex('users').insert({
      name,
      email,
      password,
      id: randomUUID(),
    })
    return currentEntry
  }

  async findByEmail(email: string) {
    const inputSchema = z.string()
    const email_ = inputSchema.parse(email)

    const user = await knex('users').where({ email: email_ }).first()
    return user
  }

  async findById(id: string) {
    const inputSchema = z.string().uuid()
    const id_ = inputSchema.parse(id)

    const user = await knex('users').where({ id: id_ }).first()
    return user
  }
}

module.exports = UserRepository
