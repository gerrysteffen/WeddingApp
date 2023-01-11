'use strict';

import mongoose from './index.js';

const eventSchema = new mongoose.Schema({
  eventName: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  description: String,
  eventCommunication: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comms'
    }
  ]
});

export const Event = mongoose.model('event', eventSchema);