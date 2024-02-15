import express, { json } from "express";
const app = express();
import itemsRoutes from "./routes/route";
import ExpressError from "./expressError";

app.use(json());
app.use("/items", itemsRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

export default app