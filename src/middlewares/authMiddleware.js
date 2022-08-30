const { jwtVerifyToken } = require("../utils/helpers/commonHelpers");

module.exports = function (req, res, next) {
  if (["/", "/login", "/register"].includes(req.path)) {
    if (!req.session.token) next();
    else res.redirect("/admin/dashboard");
  } else {
    if (req.session.token) {
      const { status } = jwtVerifyToken(req.session.token);
      if (status) {
        next();
      } else {
        delete req.session.token;
        delete req.session.userData;
        res.redirect("/admin/login");
      }
    } else {
      res.redirect("/admin");
    }
  }
};
