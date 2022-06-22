require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/user");
const listRouter = require("./routes/list");
const favRouter = require("./routes/fav");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/lists", listRouter);
app.use("/favs", favRouter);

module.exports = app;
