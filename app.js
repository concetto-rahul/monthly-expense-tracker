const path = require("path");
const express = require("express");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const { port, sessionSecret } = require("./src/utils/constants");
const authRouter = require("./src/routes/admin/authRouter");
const dashboardRouter = require("./src/routes/admin/dashboard");
const transactionsRouter = require("./src/routes/admin/transactionsRouter");

const app = express();

app.set("views", path.join(__dirname, "src/views"));
app.set("layout", "./layouts/home-layout");
app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/admin", [authRouter, dashboardRouter, transactionsRouter]);

app.get("/", (req, res) => {
  res.send("Welcome to APP");
});

app.listen(port);
