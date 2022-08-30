/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("transactions", function (table) {
    table.increments("id");
    table.integer("cat_id", 11).notNullable();
    table.integer("sub_cat_id", 11).notNullable();
    table.decimal("amount", 13, 2);
    table.date("transaction_date").notNullable();
    table.text("description", "longtext");
    table.datetime("add_date").notNullable();
    table.integer("add_by", 11).notNullable();
    table.datetime("update_date").notNullable();
    table.integer("update_by", 11).notNullable();
    table.foreign("cat_id").references("id").inTable("expense_categories");
    table
      .foreign("sub_cat_id")
      .references("id")
      .inTable("expense_sub_categories");
    table.foreign("add_by").references("id").inTable("users");
    table.foreign("update_by").references("id").inTable("users");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("transactions");
};
