import { Knex } from 'knex';

const TABLE_NAME = 'professions';


/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("profession_id").primary();

    table.string("profession_name").notNullable();
    
    table
      .bigInteger('profile_id')
      .unsigned()
      .notNullable()
      .references('profile_id')
      .inTable("profiles")
      .onDelete('CASCADE');
    
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}