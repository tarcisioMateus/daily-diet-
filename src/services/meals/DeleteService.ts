import { MealsRepository } from '../../repositories/MealsRepository'

export class DeleteService {
  mealsRepository = new MealsRepository()

  async execute(id: string, userId: string): Promise<void> {
    await this.mealsRepository.delete(id, userId)
  }
}
