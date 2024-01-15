import { Knex } from 'knex';

const TABLE_NAME = 'profiles';


/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {

    table.bigIncrements("profile_id").primary();

    table.string("description").notNullable();

    table.string("available_time").notNullable();

    table.string("image");

    table.string("minimum_charge").notNullable();

    table.string("location").notNullable();

    table.string("contact_number").notNullable();

    table
      .bigInteger('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable("users")
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