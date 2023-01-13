import jwt from 'jsonwebtoken';
import User from './../models/users.js';

const SECRET_KEY = 'Hello world.';

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];
  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id });
    if (!user) return res.sendStatus(401);
    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    res.sendStatus(401);
  }
};

export default authMiddleware;