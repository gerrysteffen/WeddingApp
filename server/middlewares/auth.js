import jwt from 'jsonwebtoken';
import User from './../models/users.js';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.token_secret_key || 'Hello world.';

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.status(401).send(JSON.stringify({error: '401', message: 'Authentication failed.'}));
  const token = authHeaders.split(' ')[1];
  try {
    const {_id} = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id });
    if (!user) return res.status(401).send(JSON.stringify({error: '401', message: 'Authentication failed.'}));
    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).send(JSON.stringify({error: '500', message: 'Server Error.'}));
  }
};

export default authMiddleware;