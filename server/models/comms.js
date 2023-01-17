'use strict';

import mongoose from './index.js';

const commsSchema = new mongoose.Schema({
  createdDate: Date,
  updatedDate: Date,
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event',
  },
  title: String,
  body: String,
});

const Comm = mongoose.model('comm', commsSchema);

export default Comm;
