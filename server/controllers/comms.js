'use strict';

import Comm from '../models/comms.js';

const getAllComms = async (req, res) => {
  try {
    const comms = await Comm.find({});
    res.status(200);
    res.send(JSON.stringify(comms));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getComm = async (req, res) => {
  try {
    const { _id } = req.body.comm;
    const comm = await Comm.find({ _id: _id });
    res.status(200);
    res.send(JSON.stringify(comm));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createComm = async (req, res) => {
  try {
    const { _id, ...commInfo } = req.body.comm;
    const comm = await Comm.create({
      ...commInfo,
    });
    res.status(201);
    res.send(JSON.stringify(comm));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateComm = async (req, res) => {
  try {
    const { _id, ...commInfo } = req.body.comm;
    await Comm.updateOne(
      { _id: _id },
      {
        ...commInfo,
      }
    );
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteComm = async (req, res) => {
  try {
    const { _id } = req.body.comm;
    await Comm.deleteOne({ _id: _id });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const CommController = {
  getAllComms,
  getComm,
  createComm,
  updateComm,
  deleteComm,
};

export default CommController;
