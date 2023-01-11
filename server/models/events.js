'use strict';

import mongoose from './index.js';

const eventSchema = new mongoose.Schema({
  createdTimestamp: Date,
  updatedTimestamp: Date,
  eventName: String,
  date: Date,
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'eventParticipation',
    },
  ],
  description: String,
  eventComms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comm',
    },
  ],
});

const Event = mongoose.model('event', eventSchema);

export default Event;
