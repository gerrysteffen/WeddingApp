'use strict';

import mongoose from './index.js';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  invites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'invitation',
    },
  ],
});

const User = mongoose.model('user', userSchema);

export default User;
