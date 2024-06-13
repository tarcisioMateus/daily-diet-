import { UsersRepository, UserOutput } from '../../repositories/UsersRepository'
import bcryptJS from 'bcryptjs'
import authConfig from '../../configs/auth'
import jwt from 'jsonwebtoken'

interface SingInInput {
  email: string
  password: string
}

interface SingInOutput {
  token: string
  user: UserOutput
}

export class CreateService {
  usersRepository = new UsersRepository()

  async execute({ email, password }: SingInInput): Promise<SingInOutput> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new Error('wrong email or password')

    const passwordMatched = await bcryptJS.compare(password, user.password)
    if (!passwordMatched) throw new Error('wrong email or password')

    const { secret, expiresIn } = authConfig.jwt
    const token = jwt.sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    })

    user.id = ''
    user.password = ''
    return { token, user }
  }
}
