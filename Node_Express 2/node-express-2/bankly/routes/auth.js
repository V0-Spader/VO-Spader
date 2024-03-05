/** Auth-related routes. */

import { register, authenticate } from '../models/user';
import { Router } from 'express';
const router = Router();
import createTokenForUser from '../helpers/createToken';


/** Register user; return token.
 *
 *  Accepts {username, first_name, last_name, email, phone, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 */

router.post('/register', async (req, res, next) => {
  try {
    const { username, password, first_name, last_name, email, phone } = req.body;
    let user = await register({username, password, first_name, last_name, email, phone});
    const token = createTokenForUser(username, user.admin);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
}); // end

/** Log in user; return token.
 *
 *  Accepts {username, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.
 *
 */
// Bug Fix #3
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    //Authenticate user
    let user = await authenticate(username, password);

    if (!user) {
      //Incorrect username/password
      return res.status(401).json({error: 'Invalid Credentials!'})
    }
    //Create JWT token
    const token = createTokenForUser(username, user.admin);

    return res.json({ token });
  } catch (err) {
    return next(err);
  }
}); // end

export default router;
