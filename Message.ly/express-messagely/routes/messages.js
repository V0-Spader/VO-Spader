import { Router } from 'express';
import {get, markRead, create} from "../models/message";
import ExpressError from '../expressError';

const router = new Router();

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get('/:id', async (req, res, next) => {
  try {
    let message = await get(req.params.id);

    if (req.user.username !== message.from_user.username && req.user.username !== message.to_user.username) {
      throw new ExpressError("Unauthorized", 401);
    }
    res.json({ message });
  } catch (err) {
    return next(err);
  }
});



/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post('/', async (req, res, next) => {
    try {
      const { to_username, body } = req.body;
  
      let message = await create({
        from_username: req.user.username,
        to_username,
        body
      });
  
      res.json({ message });
    } catch (err) {
      return next(err);
    }
  });


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

router.post('/:id/read', async (req, res, next) => {
    try {
      let message = await get(req.params.id);
  
      if (req.user.username !== message.to_user.username) {
        throw new ExpressError("Unauthorized", 401);
      }
  
      let updatedMessage = await markRead(req.params.id);
  
      res.json({ message: updatedMessage });
    } catch (err) {
      return next(err);
    }
  });