import { app } from './app'
import { env } from './env'

const PORT: number = env.PORT

app
  .listen({
    port: PORT,
  })
  .then(() => console.log(`app running on PORT: ${PORT}`))
