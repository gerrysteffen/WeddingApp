'use strict';

import mongoose from './index.js';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  address: {
    appartment: String,
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
  },
  eventParticipations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'event',
    },
  ],
});

const User = mongoose.model('user', userSchema);

export default User;
