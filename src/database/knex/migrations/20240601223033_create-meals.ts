import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary()
    table.uuid('user_id').references('users.id').onDelete('CASCADE').index()

    table.text('name').notNullable()
    table.text('description').notNullable()

    table.text('date').notNullable()
    table.text('time').notNullable()
    table.boolean('on_diet').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}
