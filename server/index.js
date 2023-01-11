'use strict';

import express from 'express';
import cors from 'cors';
import router from './router.js';
const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

const port = 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
