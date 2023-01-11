'use strict';

import { Event } from '../models/events.js';

const getAllEvents = async (req, res) => {
  try {
    await Event.find({});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getEvent = async (req, res) => {
  try {
    await Event.find({ eventId: id });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createEvent = async (req, res) => {
  try {
    await Event.create({
      eventId,
      eventName,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateEvent = async (req, res) => {
  try {
    await Event.updateOne(
      { eventId: eventId },
      {
        eventName: eventName,
      }
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteEvent = async (req, res) => {
  try {
    await Event.deleteOne({ eventId: eventId });
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
  deleteEvent
}

export default EventController