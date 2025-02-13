import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('meals', (table) => {
    table.text('timeLineValue').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  const hasColumn = await knex.schema.hasColumn('meals', 'timeLineValue')

  if (hasColumn) {
    await knex.schema.alterTable('meals', (table) => {
      table.dropColumn('timeLineValue')
    })
  }
}
