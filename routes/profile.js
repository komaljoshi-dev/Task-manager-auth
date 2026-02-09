import express from 'express';
import { authenticateToken } from '../middlewares/authmw.js';
import User from '../models/user.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res, next) => {
  try {
    // req.user.userId has userId from JWT
    //userId is accessed from the header while authenticating 
    const user = await User.findById(req.user.userId).select('-password');
    // exclude password

    if (!user) {
        const err = new Error('User not found');
        err.statusCode = 404;
        throw err;
      }

    res.json( user );
  } catch (err) {   
    next(err);
  }
});

export default router;