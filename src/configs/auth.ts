interface JwtType {
  secret: string
  expiresIn: string
}

const jwt: JwtType = {
  secret: 'default',
  expiresIn: '1d',
}

export { jwt }
