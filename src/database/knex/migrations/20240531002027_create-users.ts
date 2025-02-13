import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable('users')
  if (!exists) {
    await knex.schema.createTable('users', (table) => {
      table.uuid('id').primary().index()
      table.text('name').notNullable()
      table.text('email').notNullable().unique()
      table.text('password').notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable('users')
  if (exists) {
    await knex.schema.dropTable('users')
  }
}
