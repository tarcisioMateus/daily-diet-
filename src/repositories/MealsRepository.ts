import { knex } from '../database/knex'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export interface MealInput {
  name: string
  description: string
  date: string
  time: string
  onDiet: boolean
  userId: string
}

export class MealsRepository {
  async create(mealInput: MealInput): Promise<void> {
    const mealSchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string(),
      time: z.string(),
      onDiet: z.boolean(),
      userId: z.string().uuid(),
    })
    const { name, description, date, time, onDiet, userId } =
      mealSchema.parse(mealInput)

    await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      date,
      time,
      onDiet,
      userId,
    })
  }
}
