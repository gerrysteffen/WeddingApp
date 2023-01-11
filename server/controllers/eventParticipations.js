'use strict';

import EventParticipation from '../models/eventParticipations.js';

const getAllEPs = async (req, res) => {
  try {
    const EPs = await EventParticipation.find({});
    res.status(200);
    res.send(JSON.stringify(EPs));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getEP = async (req, res) => {
  try {
    const { _id } = req.body.eventParticipation;
    const EP = await EventParticipation.find({ _id: _id });
    res.status(200);
    res.send(JSON.stringify(EP));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createEP = async (req, res) => {
  try {
    const { _id, ...EPInfo } = req.body.eventParticipation;
    const EP = await EventParticipation.create({
      ...EPInfo,
    });
    res.status(201);
    res.send(JSON.stringify(EP));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateEP = async (req, res) => {
  try {
    const { _id, ...EPInfo } = req.body.eventParticipation;
    await EventParticipation.updateOne(
      { _id: _id },
      {
        ...EPInfo,
      }
    );
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteEP = async (req, res) => {
  try {
    const { _id } = req.body.eventParticipation;
    await EventParticipation.deleteOne({ _id: _id });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const EPController = {
  getAllEPs,
  getEP,
  createEP,
  updateEP,
  deleteEP,
};

export default EPController;