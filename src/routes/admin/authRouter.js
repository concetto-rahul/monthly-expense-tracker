const express = require("express");
const { checkSchema } = require("express-validator");
const adminAuthController = require("../../controllers/admin/adminAuthController");
const authMiddleware = require("../../middlewares/authMiddleware");
const adminLoginValidator = require("../../utils/validators/adminLoginValidator");
const authRouter = express.Router();

authRouter.get("/", authMiddleware, adminAuthController.index);
authRouter.get("/login", authMiddleware, adminAuthController.index);
authRouter.post(
  "/login",
  [authMiddleware, checkSchema(adminLoginValidator)],
  adminAuthController.login
);
authRouter.get("/register", authMiddleware, adminAuthController.register);
authRouter.post("/register", authMiddleware, adminAuthController.register);

authRouter.get(
  "/forgot-password",
  authMiddleware,
  adminAuthController.register
);

module.exports = authRouter;
