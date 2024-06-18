import { MealsRepository } from '../../repositories/MealsRepository'

export class DeleteService {
  mealsRepository = new MealsRepository()

  async execute(id: string, userId: string): Promise<void> {
    this.mealsRepository = new MealsRepository()

    await this.mealsRepository.delete(id, userId)
  }
}
