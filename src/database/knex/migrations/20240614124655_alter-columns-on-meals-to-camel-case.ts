import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const hasClmn = await knex.schema.hasColumn('meals', 'user_id')
  const hasColumn = await knex.schema.hasColumn('meals', 'on_diet')

  if (hasClmn) {
    await knex.schema.alterTable('meals', (table) => {
      table.renameColumn('user_id', 'userId')
    })
  }
  if (hasColumn) {
    await knex.schema.alterTable('meals', (table) => {
      table.renameColumn('on_diet', 'onDiet')
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  const hasClmn = await knex.schema.hasColumn('meals', 'userId')
  const hasColumn = await knex.schema.hasColumn('meals', 'onDiet')

  if (hasClmn) {
    await knex.schema.alterTable('meals', (table) => {
      table.renameColumn('userId', 'user_id')
    })
  }
  if (hasColumn) {
    await knex.schema.alterTable('meals', (table) => {
      table.renameColumn('onDiet', 'on_diet')
    })
  }
}
