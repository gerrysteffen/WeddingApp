'use strict';

import mongoose from './index.js';

const eventSchema = new mongoose.Schema({
  createdTimestamp: Date,
  updatedTimestamp: Date,
  name: String,
  date: Date,
  description: String,
  invites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'invite',
    },
  ],
  organisers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  eventComms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comm',
    },
  ],
});

const Event = mongoose.model('event', eventSchema);

export default Event;
