import { UsersRepository, UserInput } from '../../repositories/UsersRepository'
import bcryptJS from 'bcryptjs'

export class CreateService {
  usersRepository = new UsersRepository()

  async execute({ name, email, password }: UserInput): Promise<void> {
    const userWithEmail = await this.usersRepository.findByEmail(email)

    if (userWithEmail) throw new Error('Email already in use!')

    const encryptedPassword = await bcryptJS.hash(password, 8)

    await this.usersRepository.create({
      name,
      email,
      password: encryptedPassword,
    })
  }
}
