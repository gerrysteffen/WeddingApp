'use strict';

import mongoose from 'mongoose';

try {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://127.0.0.1:27017/weddingApp');
  console.log('Connected successfully to database');
} catch (err) {
  console.log('Mongoose connection err: ' + err);
}

export default mongoose;
