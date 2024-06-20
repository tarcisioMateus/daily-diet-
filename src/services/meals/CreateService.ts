import {
  MealsRepository,
  MealRawInput,
} from '../../repositories/MealsRepository'
import { getTimeLineValueFromDateAndTime } from '../../utils/getTimeLineValueFromDateAndTime'

export class CreateService {
  mealsRepository = new MealsRepository()

  async execute({
    name,
    description,
    date,
    time,
    onDiet,
    userId,
  }: MealRawInput): Promise<void> {
    const timeLineValue: string = getTimeLineValueFromDateAndTime(date, time)
    await this.mealsRepository.create({
      name,
      description,
      date,
      time,
      onDiet,
      userId,
      timeLineValue,
    })
  }
}
