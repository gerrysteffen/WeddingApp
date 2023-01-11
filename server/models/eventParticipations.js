'use strict';

import mongoose from './index.js';

const eventParticipationSchema = new mongoose.Schema({
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
  role: String,
  maxGuests: Number,
  guests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  rsvp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rsvp',
  },
});

const EventParticipation = mongoose.model(
  'eventParticipation',
  eventParticipationSchema
);

export default EventParticipation;
