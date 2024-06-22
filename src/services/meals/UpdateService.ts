import { MealsRepository, MealRaw } from '../../repositories/MealsRepository'
import { getTimeLineValueFromDateAndTime } from '../../utils/getTimeLineValueFromDateAndTime'

export class UpdateService {
  mealsRepository = new MealsRepository()

  async execute(updatedMeal: MealRaw): Promise<void> {
    const currentMeal = await this.mealsRepository.getById(
      updatedMeal.id,
      updatedMeal.userId,
    )
    if (!currentMeal) throw new Error('not found!')

    // if wasn't passed a value to the property, it'll use the previews value.
    updatedMeal.name = updatedMeal.name.length
      ? updatedMeal.name
      : currentMeal.name.trim().toLowerCase()
    updatedMeal.description = updatedMeal.description.length
      ? updatedMeal.description
      : currentMeal.description.trim().toLowerCase()
    updatedMeal.date = updatedMeal.date.length
      ? updatedMeal.date
      : currentMeal.date.trim().toLowerCase()
    updatedMeal.time = updatedMeal.time.length
      ? updatedMeal.time
      : currentMeal.time.trim().toLowerCase()

    const timeLineValue: string = getTimeLineValueFromDateAndTime(
      updatedMeal.date,
      updatedMeal.time,
    )

    await this.mealsRepository.update({ ...updatedMeal, timeLineValue })
  }
}
