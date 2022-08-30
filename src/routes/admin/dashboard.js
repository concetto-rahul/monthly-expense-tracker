const express = require("express");
const dashboardController = require("../../controllers/admin/dashboardController");
const authMiddleware = require("../../middlewares/authMiddleware");
const dashboardRouter = express.Router();

dashboardRouter.get("/dashboard", authMiddleware, dashboardController.index);
dashboardRouter.get("/logout", authMiddleware, dashboardController.logout);

module.exports = dashboardRouter;
