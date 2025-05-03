import User from '../models/User.js';
import Errorhandler from '../utils/Errorhandler.js';
import jwt, { decode } from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    return next(new Errorhandler('Not authenticted | No token provided'));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new Errorhandler('Token failed', 401));
  }
};
