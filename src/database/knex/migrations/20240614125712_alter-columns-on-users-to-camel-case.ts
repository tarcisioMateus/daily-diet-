import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const hasColumn = await knex.schema.hasColumn('users', 'created_at')

  if (hasColumn) {
    await knex.schema.alterTable('users', (table) => {
      table.renameColumn('created_at', 'createdAt')
    })
  } else {
    console.warn('Column "created_at" does not exist in the "users" table.')
  }
}

export async function down(knex: Knex): Promise<void> {
  const hasColumn = await knex.schema.hasColumn('users', 'createdAt')

  if (hasColumn) {
    await knex.schema.alterTable('users', (table) => {
      table.renameColumn('createdAt', 'created_at')
    })
  } else {
    console.warn('Column "createdAt" does not exist in the "users" table.')
  }
}
