'use strict';

import mongoose from './index.js';

const inviteSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event',
  },
  mainGuest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  isOrganiser: Boolean,
  isVIP: Boolean,
  role: String,
  attendanceStatus: String,
  maxAddGuests: Number,
  numberAddGuests: Number,
  guests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  rsvps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'rsvp',
    },
  ],
});

const Invite = mongoose.model(
  'invite',
  inviteSchema
);

export default Invite;
