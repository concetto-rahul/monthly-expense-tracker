const { connection } = require("../configs/mysql");
const {
  parseSqlResult,
  jwtSignToken,
} = require("../utils/helpers/commonHelpers");

const checkUserLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "select id,name,email from users where email=? and password=?",
      [email, password],
      (err, rows, fields) => {
        if (err) {
          reject({ status: 500, error: "SOMETHING_WENT_WRONG" });
        } else if (!rows[0]) {
          reject({ status: 404, error: "RECORD_NOT_FOUND" });
        } else {
          const userData = parseSqlResult(rows[0]);
          const token = jwtSignToken(userData);
          resolve({ status: 200, userData, token });
        }
      }
    );
  });
};

module.exports = {
  checkUserLogin,
};
