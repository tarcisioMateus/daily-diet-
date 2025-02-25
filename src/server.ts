import { app } from './app'
import { env } from './env'

const PORT: number = env.PORT

app
  .listen({
    port: PORT,
    host: '0.0.0.0'
  })
  .then(() => console.log(`app running on PORT: ${PORT}`))
