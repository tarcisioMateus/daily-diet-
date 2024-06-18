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

export interface MealOutput {
  id: string
  userId: string
  name: string
  description: string
  date: string
  time: string
  onDiet: boolean
}

export interface MealUpdateInput {
  id: string
  name: string
  description: string
  date: string
  time: string
  onDiet: boolean
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

  async getById(id: string): Promise<MealOutput | undefined> {
    const meal = await knex('meals').where({ id }).select().first()
    return meal
  }

  async update(meal: MealUpdateInput): Promise<void> {
    await knex('meals').where({ id: meal.id }).update({
      name: meal.name,
      description: meal.description,
      date: meal.date,
      time: meal.time,
      onDiet: meal.onDiet,
    })
  }
}
