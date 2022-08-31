// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.DB_MYSQL_HOST,
      port: 3306,
      database: process.env.DB_MYSQL_DATABASE,
      user: process.env.DB_MYSQL_USER,
      password: process.env.DB_MYSQL_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  staging: {
    client: "mysql",
    connection: {
      host: process.env.DB_MYSQL_HOST,
      port: 3306,
      database: process.env.DB_MYSQL_DATABASE,
      user: process.env.DB_MYSQL_USER,
      password: process.env.DB_MYSQL_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  production: {
    client: "postgresql",
    connection: {
      host: process.env.DB_MYSQL_HOST,
      port: 3306,
      database: process.env.DB_MYSQL_DATABASE,
      user: process.env.DB_MYSQL_USER,
      password: process.env.DB_MYSQL_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
