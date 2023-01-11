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
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'event'
    }
  ],
  isOrganiser: Boolean,
  isImportant: Boolean,
  maxGuests: Number,
  rsvp: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'rsvp'
    }
  ],
});

export const User = mongoose.model('user', userSchema);