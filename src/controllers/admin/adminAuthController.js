const { validationResult } = require("express-validator");
const { checkUserLogin } = require("../../models/user");
const {
  errorsMessage,
  isObjectEmpty,
} = require("../../utils/helpers/commonHelpers");
let adminAuthController = {};

adminAuthController.index = (req, res) => {
  const errors = {};
  const enterData = {};
  res.render("login", {
    errors,
    enterData,
    title: "Login",
    layout: "./layouts/auth-layout",
  });
};

adminAuthController.login = async (req, res) => {
  const enterData = req.body;
  const errorsValidation = validationResult(req);
  let errors = errorsMessage(errorsValidation);
  if (isObjectEmpty(errors)) {
    try {
      const { token, userData } = await checkUserLogin(
        req.body.email,
        req.body.password
      );
      req.session.token = token;
      req.session.userData = userData;
      return res.redirect("/admin/dashboard");
    } catch (error) {
      errors["invalidCred"] = "Invalid credentials";
    }
  }
  return res.render("login", {
    errors,
    enterData,
    title: "Login",
    layout: "./layouts/auth-layout",
  });
};

adminAuthController.register = (req, res) => {
  res.render("register", {
    title: "register",
    layout: "./layouts/auth-layout",
  });
};

module.exports = adminAuthController;
