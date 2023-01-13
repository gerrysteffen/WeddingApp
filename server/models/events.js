'use strict';

import mongoose from './index.js';

const eventSchema = new mongoose.Schema({
  createdTimestamp: Date,
  updatedTimestamp: Date,
  name: String,
  date: Date,
  invites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'invite',
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
