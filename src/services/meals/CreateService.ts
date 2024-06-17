import { MealsRepository, MealInput } from '../../repositories/MealsRepository'

export class CreateService {
  mealsRepository = new MealsRepository()

  async execute({
    name,
    description,
    date,
    time,
    onDiet,
    userId,
  }: MealInput): Promise<void> {
    await this.mealsRepository.create({
      name,
      description,
      date,
      time,
      onDiet,
      userId,
    })
  }
}
