'use strict';

import mongoose from './index.js';

const rsvpSchema = new mongoose.Schema({
  invite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'invite',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  attendanceStatus: String,
  mealPreference: String,
  allergies: [
    String
  ],
});

const RSVP = mongoose.model('rsvp', rsvpSchema);

export default RSVP;
