/** User related routes. */

import { getAll, get, update } from '../models/user';
import { Router } from 'express';
const router = new Router();
import ExpressError from '../helpers/expressError';
import { authUser, requireLogin, requireAdmin } from '../middleware/auth';

/** GET /
 *
 * Get list of users. Only logged-in users should be able to use this.
 *
 * It should return only *basic* info:
 *    {users: [{username, first_name, last_name}, ...]}
 *
 */

router.get('/', authUser, requireLogin, async (req, res, next) => {
  try {
    let users = await getAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
}); // end

/** GET /[username]
 *
 * Get details on a user. Only logged-in users should be able to use this.
 *
 * It should return:
 *     {user: {username, first_name, last_name, phone, email}}
 *
 * If user cannot be found, return a 404 err.
 *
 */

router.get('/:username', authUser, requireLogin, async (
  req,
  res,
  next
) => {
  try {
    // Replace with actual logic to fetch user data
    const user = await get(req.params.username);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract relevant fields from the user object
    const { username, first_name, last_name, phone, email } = user;

    return res.json({ user: { username, first_name, last_name, phone, email } });
  } catch (err) {
    return next(err);
  }
}); //end

/** PATCH /[username]
 *
 * Update user. Only the user themselves or any admin user can use this.
 *
 * It should accept:
 *  {first_name, last_name, phone, email}
 *
 * It should return:
 *  {user: all-data-about-user}
 *
 * It user cannot be found, return a 404 err. If they try to change
 * other fields (including non-existent ones), an error should be raised.
 *
 */

//Bug fix #2

router.patch('/:username', authUser, requireLogin, requireAdmin, async (
  req,
  res,
  next
) => {
  try {
    // Check if the user exists
    const existingUser = await get(req.params.username);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate and sanitize fields
    const { first_name, last_name, phone, email } = req.body;
    // Add validation logic for fields (e.g., check if email is valid)

    // Update user data
    existingUser.first_name = first_name;
    existingUser.last_name = last_name;
    existingUser.phone = phone;
    existingUser.email = email;
    await existingUser.save();

    return res.json({ user: existingUser });
  } catch (err) {
    return next(err);
  }
});
 // end

/** DELETE /[username]
 *
 * Delete a user. Only an admin user should be able to use this.
 *
 * It should return:
 *   {message: "deleted"}
 *
 * If user cannot be found, return a 404 err.
 */

// end

// Bug fix #1

router.delete('/:username', authUser, requireAdmin, async (
  req,
  res,
  next
) => {
  try {
    // Check if the user exists
    const userExists = await userExists(req.params.username);

    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user
    delete users[req.params.username];

    return res.json({ message: 'deleted' });
  } catch (err) {
    // Handle errors
    return next(err);
  }
});

export default router;
