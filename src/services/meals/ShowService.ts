import { MealsRepository, Meal } from '../../repositories/MealsRepository'

export class ShowService {
  mealsRepository = new MealsRepository()

  async execute(id: string, userId: string): Promise<Meal> {
    this.mealsRepository = new MealsRepository()

    const meal = await this.mealsRepository.getById(id, userId)
    if (!meal) throw new Error('not found!')

    return meal
  }
}
