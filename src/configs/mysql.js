const mysql = require("mysql");

const { host, user, password, database } = require("../utils/constants");

const connection = mysql.createConnection({ host, user, password, database });

connection.connect((err) => {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = {
  connection,
};
