"use strict";

/** Express app for jobly. */

import express, { json } from "express";
import cors from "cors";

import { NotFoundError } from "./expressError";

import { authenticateJWT } from "./middleware/auth";
import authRoutes from "./routes/auth";
import companiesRoutes from "./routes/companies";
import usersRoutes from "./routes/users";

import morgan from "morgan";

const app = express();

app.use(cors());
app.use(json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/companies", companiesRoutes);
app.use("/users", usersRoutes);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

export default app;
