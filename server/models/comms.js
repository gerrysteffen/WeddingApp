'use strict';

import mongoose from './index.js';

const commsSchema = new mongoose.Schema({
  createdDate: Date,
  updatedDate: Date,
  title: String,
  body: String,
  isImportant: Boolean,
});

export const Comms = mongoose.model('comms', eventSchema);