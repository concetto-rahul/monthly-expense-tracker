module.exports = {
  port: process.env.PORT || 5000,
  sessionSecret: process.env.JWT_SECRET,
  host: process.env.DB_MYSQL_HOST || "localhost",
  user: process.env.DB_MYSQL_USER,
  password: process.env.DB_MYSQL_PASSWORD,
  database: process.env.DB_MYSQL_DATABASE,
  jwtSecret: process.env.JWT_SECRET,
};
