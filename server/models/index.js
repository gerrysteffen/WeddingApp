'use strict';

import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

const mongoURL = process.env.mongoDBAtlas_url

try {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb+srv://'+mongoURL);
  console.log('Connected successfully to database');
} catch (err) {
  console.log('Mongoose connection err: ' + err);
}

export default mongoose;
