import { Router } from "express";
import { all, get, messagesTo, messagesFrom } from "../models/user";
import { ensureLoggedIn, ensureCorrectUser } from "../middleware/auth";

const router = new Router();


/** get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/

router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    let users = await all();
    return res.json({users});
  }

  catch (err) {
    return next(err);
  }
});

/** get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/

router.get("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    let user = await get(req.params.username);
    return res.json({user});
  }

  catch (err) {
    return next(err);
  }
});

/** get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/to", ensureCorrectUser, async function (req, res, next) {
  try {
    let messages = await messagesTo(req.params.username);
    return res.json({messages});
  }

  catch (err) {
    return next(err);
  }
});

/** get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/from", ensureCorrectUser, async function (req, res, next) {
  try {
    let messages = await messagesFrom(req.params.username);
    return res.json({messages});
  }

  catch (err) {
    return next(err);
  }
});



export default router;