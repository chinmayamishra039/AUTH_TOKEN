const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config;
const app = express();
const AuthRoute = require("./Routes/Auth.route");
const port = process.env.port || 3000;

app.get("/", async (req, res, next) => {
  res.send("Hello from express");
});
app.use("/auth", AuthRoute);
app.use(morgan(dev))
// creation of error if no route found
app.use(async (req, res, next) => {
  //error obj createad
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
  //   next(createError.NotFound("U Simply Fucked Off"));
  // if we dont provide anything it will simply give u not found message
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: { status: err.status || 500, message: err.message },
  });
});

app.listen(port, () => {
  console.log(`Server is listening port ${port}`);
});
