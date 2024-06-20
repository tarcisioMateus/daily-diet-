import setUpKnex, { Knex } from 'knex'
import { env } from '../../env'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/database/knex/migrations',
  },
}

export const knex = setUpKnex(config)
