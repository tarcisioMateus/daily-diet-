import { MealsRepository, Meal } from '../../repositories/MealsRepository'
import { getMealsBestSequence } from '../../utils/getMealsBestSequence'

export interface MealsMetrics {
  bestSequence: number
  amountOnDiet: number
  amountOutOfDiet: number
  totalAmount: number
}

export class ShowService {
  mealsRepository = new MealsRepository()

  async execute(userId: string): Promise<MealsMetrics> {
    const meals: Meal[] =
      await this.mealsRepository.getMealsOrganizedByTimeLineValue(userId)

    if (!meals.length) throw new Error('User has No metrics to be showed')
    const bestSequence: Meal[] = getMealsBestSequence(meals)

    const mealsOnDiet: Meal[] =
      await this.mealsRepository.getMealsOnDiet(userId)
    const mealsOutOfDiet: Meal[] =
      await this.mealsRepository.getMealsOutOfDiet(userId)

    return {
      bestSequence: bestSequence.length,
      amountOnDiet: mealsOnDiet.length,
      amountOutOfDiet: mealsOutOfDiet.length,
      totalAmount: meals.length,
    }
  }
}
