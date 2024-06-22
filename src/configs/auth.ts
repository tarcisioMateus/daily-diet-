import { env } from '../env'

interface JwtType {
  secret: string
  expiresIn: string
}

const jwt: JwtType = {
  secret: env.AUTH_JWT_SECRET,
  expiresIn: '1d',
}

export default { jwt }
