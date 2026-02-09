
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


const router = express.Router();

// Signup route (NO token generation here)
router.post('/register', async (req, res, next) => {

    try {
        const { username, email, password} = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const err = new Error('User already exists');
            err.statusCode = 400;
            throw err;
          }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({ username, email, password: hashedPassword});
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' }); // No token in response
  } catch (err) {
        next(err);  }
});


// Login route (Token is generated here)
router.post('/login', async (req, res, next) => {

  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    const { email, password } = req.body;
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
        const err = new Error('Invalid credentials');
        err.statusCode = 400;
        throw err;
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const err = new Error('Invalid credentials');
        err.statusCode = 400;
        throw err;
    }
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id},
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
        next(err);  }
});

export default router;
