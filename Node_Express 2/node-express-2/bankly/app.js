/** Application for bank.ly */

import express, { json } from 'express';
const app = express();
import ExpressError from "./helpers/expressError";


app.use(json());

import authRoutes from './routes/auth';
import userRoutes from './routes/users';

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

/** 404 handler */

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    status: err.status,
    message: err.message
  });
});

export default app;
