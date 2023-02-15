import jwt from 'jsonwebtoken';
import User from './../models/users.js';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.token_secret_key || 'Hello world.';

const conditionalAuthMiddleware = async (req, res, next) => {
  try {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders) {
      next();
    } else {
      const token = authHeaders.split(' ')[1];
      const { _id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findOne({ _id });
      if (!user) {
        next(); 
      } else {
        req.user = user;
        next();
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(JSON.stringify({error: '500', message: 'Server error.'}));
  }
};

export default conditionalAuthMiddleware;