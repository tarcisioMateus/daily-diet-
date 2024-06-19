import { MealsRepository, Meal } from '../../repositories/MealsRepository'

export class ListService {
  mealsRepository = new MealsRepository()

  async execute(userId: string, search: string | undefined): Promise<Meal[]> {
    this.mealsRepository = new MealsRepository()

    let meals: Meal[]
    if (search && search.length) {
      meals = await this.mealsRepository.getMealsByName(search, userId)
    } else {
      meals = await this.mealsRepository.getMeals(userId)
    }

    if (!meals.length) throw new Error('not found!')

    return meals
  }
}
