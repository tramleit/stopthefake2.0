require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;
const BASE_URL = process.env.BASE_URL || "/api";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const SESSION_SECRET = process.env.SESSION_SECRET || "session_secret";

const store = new MongoDBStore({
  uri: MONGO_URL,
  collection: "sessions",
});

mongoose
  .connect(MONGO_URL)
  .then(() => console.log(`Database Connected Successfully.`))
  .catch((err) => console.error("Database Connection Error: ", err));

app.use(cors({ origin: "*", credentials: true }));
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./passport/google");

passport.serializeUser((user, cb) => {
  console.log("===== Serialize User =====");
  console.log(user);
  return cb(null, user);
});
passport.deserializeUser((user, cb) => {
  console.log("===== Deserialize User =====");
  console.log(user);
  return cb(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${CLIENT_URL}/login`,
  }),
  (req, res) => {
    res.redirect(`${CLIENT_URL}/login?auth=true`);
  }
);

app.get(BASE_URL, (req, res) => {
  res.status(200).json({ message: "Server is up & running..." });
});

const migrationRoutes = require("./routers/migration");
const authRouter = require("./routers/auth");
const productRouter = require("./routers/product");
const subscriptionRouter = require("./routers/subscription");
const userRouter = require("./routers/user");
const dashboardRouter = require("./routers/dashboard");

app.use(`${BASE_URL}/correction`, migrationRoutes);
app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/products`, productRouter);
app.use(`${BASE_URL}/subscription`, subscriptionRouter);
app.use(`${BASE_URL}/users`, userRouter);
app.use(`${BASE_URL}/dashboard`, dashboardRouter);

app.use("/assets", express.static("public"));

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
