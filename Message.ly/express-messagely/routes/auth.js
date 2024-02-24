import { sign } from "jsonwebtoken";
import { Router } from "express";
const router = new Router();

import { authenticate, updateLoginTimestamp, register } from "../models/user";
import { SECRET_KEY } from "../config";
import ExpressError from "../expressError";


/** login: {username, password} => {token} */

router.post("/login", async function (req, res, next) {
  try {
    let {username, password} = req.body;
    if (await authenticate(username, password)) {
      let token = sign({username}, SECRET_KEY);
      updateLoginTimestamp(username);
      return res.json({token});
    } else {
      throw new ExpressError("Invalid username/password", 400);
    }
  }

  catch (err) {
    return next(err);
  }
});

/** register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 */

router.post("/register", async function (req, res, next) {
  try {
    let {username} = await register(req.body);
    let token = sign({username}, SECRET_KEY);
    updateLoginTimestamp(username);
    return res.json({token});
  }

  catch (err) {
    return next(err);
  }
});



export default router;