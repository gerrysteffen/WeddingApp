'use strict';

import Event from '../models/events.js';

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200);
    res.send(JSON.stringify(events));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getEvent = async (req, res) => {
  try {
    const { _id } = req.body.event;
    const event = await Event.find({ _id: _id })
      .populate('eventComms')
      .populate('participants');
    res.status(200);
    res.send(JSON.stringify(event));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createEvent = async (req, res) => {
  try {
    const { _id, ...eventInfo } = req.body.event;
    const event = await Event.create({
      ...eventInfo,
    });
    res.status(201);
    res.send(JSON.stringify(event));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateEvent = async (req, res) => {
  try {
    const { _id, ...eventInfo } = req.body.event;
    await Event.updateOne(
      { _id: _id },
      {
        ...eventInfo,
      }
    );
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { _id } = req.body.event;
    await Event.deleteOne({ _id: _id });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const EventController = {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};

export default EventController;
