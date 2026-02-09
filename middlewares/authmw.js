import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied. Token missing.' });

  //authentication happens by verifying that token from header and our jwt_secret
  jwt.verify(token, JWT_SECRET, (err, user) => {
     if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user;
    next();
  });
};
