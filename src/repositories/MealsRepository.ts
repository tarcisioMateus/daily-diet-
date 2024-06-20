import { knex } from '../database/knex'
import { randomUUID } from 'node:crypto'

export interface MealRawInput {
  name: string
  description: string
  date: string
  time: string
  onDiet: boolean
  userId: string
}

export interface MealRaw {
  id: string
  userId: string
  name: string
  description: string
  date: string
  time: string
  onDiet: boolean
}

export interface Meal {
  id: string
  userId: string
  name: string
  description: string
  date: string
  time: string
  onDiet: boolean
  timeLineValue: string
}

interface MealInput {
  name: string
  description: string
  date: string
  time: string
  onDiet: boolean
  userId: string
  timeLineValue: string
}

export class MealsRepository {
  async create(mealInput: MealInput): Promise<void> {
    const { name, description, date, time, onDiet, userId, timeLineValue } =
      mealInput

    await knex('meals').insert({
      id: randomUUID(),
      name: name.toLowerCase().trim(),
      description,
      date,
      time,
      onDiet,
      userId,
      timeLineValue,
    })
  }

  async getById(id: string, userId: string): Promise<Meal | undefined> {
    const meal = await knex('meals').where({ id, userId }).select().first()
    return meal
  }

  async getMealsByName(search: string, userId: string): Promise<Meal[]> {
    const meals = await knex('meals')
      .where({ userId })
      .whereLike('name', `%${search.toLowerCase().trim()}%`)
      .orderBy('meals.name')
    return meals
  }

  async getMeals(userId: string): Promise<Meal[]> {
    const meals = await knex('meals').where({ userId }).orderBy('meals.name')
    return meals
  }

  async delete(id: string, userId: string): Promise<void> {
    await knex('meals').where({ id, userId }).delete()
  }

  async update(meal: Meal): Promise<void> {
    await knex('meals').where({ id: meal.id, userId: meal.userId }).update({
      name: meal.name,
      description: meal.description,
      date: meal.date,
      time: meal.time,
      onDiet: meal.onDiet,
      timeLineValue: meal.timeLineValue,
    })
  }
}
