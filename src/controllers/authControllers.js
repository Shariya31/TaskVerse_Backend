import User from '../models/User.js';
import Errorhandler from '../utils/Errorhandler.js';
import TryCatch from '../utils/TryCatch.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = TryCatch(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return next(new Errorhandler('Please fill all the fields', 400));

  const userExist = await User.findOne({ email });

  if (userExist) return next(new Errorhandler('User already exists', 400));

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(200).json({
    success: true,
    message: `User registered successfully`,
    user,
  });
});

export const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new Errorhandler('Please fill all the fields'));

  const user = await User.findOne({ email }).select('password name');

  if (!user) return next(new Errorhandler('No user found with this emil', 404));

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return next(new Errorhandler('Password is not correct', 401));

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.status(200).json({
    success: true,
    message: `User logged In`,
    token,
  });
});
