import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('meals', (table) => {
    table.renameColumn('user_id', 'userId')
    table.renameColumn('on_diet', 'onDiet')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('meals', (table) => {
    table.renameColumn('userId', 'user_id')
    table.renameColumn('onDiet', 'on_diet')
  })
}
