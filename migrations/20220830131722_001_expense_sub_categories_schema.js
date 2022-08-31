/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("expense_sub_categories", function (table) {
    table.increments("id");
    table.integer("parent_id", 11).unsigned().notNullable();
    table.string("name", 255).notNullable();
    table.foreign("parent_id").references("id").inTable("expense_categories");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("expense_sub_categories");
};
