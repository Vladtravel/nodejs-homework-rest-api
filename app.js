const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { HttpCode } = require("./service/constants");

const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || HttpCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
});

module.exports = app;
