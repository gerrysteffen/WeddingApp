'use strict';

import RSVP from '../models/rsvp.js';

const getAllRSVPs = async (req, res) => {
  try {
    const rsvps = await RSVP.find({});
    res.status(200);
    res.send(JSON.stringify(rsvps));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getRSVP = async (req, res) => {
  try {
    const { _id } = req.body.rsvp;
    const rsvp = await RSVP.find({ _id: _id });
    res.status(200);
    res.send(JSON.stringify(rsvp));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createRSVP = async (req, res) => {
  try {
    const { _id, ...RSVPInfo } = req.body.rsvp;
    const rsvp = await RSVP.create({
      ...RSVPInfo,
    });
    res.status(201);
    res.send(JSON.stringify(rsvp));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateRSVP = async (req, res) => {
  try {
    const { _id, ...RSVPInfo } = req.body.rsvp;
    await RSVP.updateOne(
      { _id: _id },
      {
        ...RSVPInfo,
      }
    );
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteRSVP = async (req, res) => {
  try {
    const { _id } = req.body.rsvp;
    await RSVP.deleteOne({ _id: _id });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const RSVPController = {
  getAllRSVPs,
  getRSVP,
  createRSVP,
  updateRSVP,
  deleteRSVP,
};

export default RSVPController;
