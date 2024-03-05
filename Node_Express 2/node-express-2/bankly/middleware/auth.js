/** Middleware for handling req authorization for routes. */

import { decode } from 'jsonwebtoken';
import { SECRET_KEY } from '../config';

/** Authorization Middleware: Requires user is logged in. */

function requireLogin(req, res, next) {
  if (req.curr_username) {
    return next();
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

/** Authorization Middleware: Requires user is logged in and is staff. */

function requireAdmin(req, res, next) {
  if (req.curr_admin) {
    return next();
  } else {
     return res.status(401).json({ error: 'Unauthorized'});
  }
}

/** Authentication Middleware: put user on request
 *
 * If there is a token, verify it, get payload (username/admin),
 * and store the username/admin on the request, so other middleware/routes
 * can use it.
 *
 * It's fine if there's no token---if not, don't set anything on the
 * request.
 *
 * If the token is invalid, an error will be raised.
 *
 **/

function authUser(req, res, next) {
  try {
    const token = req.body._token || req.query._token;
    if (token) {
      //Verify the token 
      let payload = decode(token);
      //set user prop on req
      req.curr_username = payload.username;
      req.curr_admin = payload.admin;
    }
    return next();
  } catch (err) {
    //handle token ver errors
    return res.status(401).json({ error: 'Unauthorized'});
  }
} // end

export default {
  requireLogin,
  requireAdmin,
  authUser
};
