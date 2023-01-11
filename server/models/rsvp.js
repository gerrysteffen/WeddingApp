'use strict';

import mongoose from './index.js';

const rsvpSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  rsvpStatus: String,
  additionalGuests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  mealPreferences: [{
    name: String,
    applicable: Boolean,
    comments: String,
  }]

});

export const RSVP = mongoose.model('rsvp', userSchema);