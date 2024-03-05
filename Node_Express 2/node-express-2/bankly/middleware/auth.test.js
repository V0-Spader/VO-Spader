import { decode } from "jsonwebtoken";
import {authUser} from "auth.js"

describe('authUser middleware', () => {
    it('should set req.curr_username and req.curr_admin when a valid token is provided', () => {
      
        // Mock the decode function to return a valid payload
      const validPayload = { username: 'testuser', admin: true };
      jwt.verify = jest.fn().mockReturnValue(validPayload);
  
      const req = { body: { _token: 'valid-token' } };
      const res = {};
      const next = jest.fn();
  
      authUser(req, res, next);
  
      expect(req.curr_username).toBe('testuser');
      expect(req.curr_admin).toBe(true);
      expect(next).toHaveBeenCalled();
    });

    it('should not set req.curr_username and req.curr_admin when no token is provided', () => {
      const req = { body: {}, query: {} };
      const res = {};
      const next = jest.fn();
  
      authUser(req, res, next);
  
      expect(req.curr_username).toBeUndefined();
      expect(req.curr_admin).toBeUndefined();
      expect(next).toHaveBeenCalled();
    });
  
    it('should return 401 if an invalid token is provided', () => {
      // Mock the decode function to throw an error
      jwt.verify = jest.fn().mockImplementation(() => {
        throw new Error('Invalid token');
      });
  
      const req = { body: { _token: 'invalid-token' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
  
      authUser(req, res, next);
  
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
      expect(next).not.toHaveBeenCalled();
    });
});