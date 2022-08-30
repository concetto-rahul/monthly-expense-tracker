const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../constants");

function errorsMessage(errorArr) {
  let errorObj = {};
  errorArr?.errors.forEach((val) => {
    errorObj[val.param] = val.msg;
  });
  return errorObj;
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function parseSqlResult(rows) {
  return JSON.parse(JSON.stringify(rows));
}

function jwtSignToken(data) {
  return jwt.sign(data, jwtSecret, { expiresIn: "1h" });
}

function jwtVerifyToken(data) {
  try {
    const tokenData = jwt.verify(data, jwtSecret);
    return { status: true, tokenData };
  } catch (error) {
    return { status: false, error: "INVALID_TOKEN" };
  }
}

module.exports = {
  errorsMessage,
  isObjectEmpty,
  parseSqlResult,
  jwtSignToken,
  jwtVerifyToken,
};
