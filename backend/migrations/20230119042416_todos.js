/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("todos", (table) => {
      table.increments();
      table.integer("user_id")
      table.foreign("user_id").references("users.id")
      table.string("todo");
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schemadropTable("todos");
  };