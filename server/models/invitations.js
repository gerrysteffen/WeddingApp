'use strict';

import mongoose from './index.js';

const invitationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  isOrganiser: Boolean,
  isVIP: Boolean,
  isPlusOne: Boolean,
  role: String,
  maxPlus: Number,
  plusOnes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  rsvp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rsvp',
  },
});

const Invitation = mongoose.model(
  'invitation',
  invitationSchema
);

export default Invitation;
