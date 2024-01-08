import { Knex } from "knex";

const TABLE_NAME = "users";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          username: "Mansij",
          email: "mansij@gmail.com",
          password:
            "$2b$10$klqidHcFcYvL.jlxiHMjIeSLHtUKt55B1HP3SmQ.p1CYYybMZpVwy",
        },
        {
          username: "Raam",
          email: "ram@gmail.com",
          password:
            "$2b$10$RP02bKlbB.yeTiJDuCXG6uKDItfXLxshGW2zfc7YTkOcQOLE0xJUi",
        },
      ]);
    });
}
