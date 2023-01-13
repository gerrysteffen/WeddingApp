'use strict';

import mongoose from './index.js';

const rsvpSchema = new mongoose.Schema({
  invitation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'invitation',
  },
  rsvpStatus: String,
  additionalGuests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  mealPreferences: [
    {
      name: String,
      applicable: Boolean,
      isOther: Boolean,
      // comments: String,
    },
  ],
});

const RSVP = mongoose.model('rsvp', rsvpSchema);

export default RSVP;
