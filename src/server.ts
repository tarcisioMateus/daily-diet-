import { app } from './app'

app
  .listen({
    port: 3333,
  })
  .then(() => console.log(`app running on PORT: 3333`))
