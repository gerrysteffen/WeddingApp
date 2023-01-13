'use strict';

import Event from '../models/events.js';
import Invite from '../models/invites.js';

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

const getEvents = async (req, res) => {
  try {
    const userInvites = await Invite.find({guests: req.user._id}).select('event -_id')
    const eventIds = userInvites.map((invite)=>invite.event)
    const events = await Event.find({_id: {$in: eventIds}});
    res.status(200);
    res.send(JSON.stringify(events));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getMyEvents = async (req, res) => {
  try {
    const userInvites = await Invite.find({mainGuest: req.user._id}).select('event -_id')
    const eventIds = userInvites.map((invite)=>invite.event)
    const events = await Event.find({_id: {$in: eventIds}});
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
    console.log(req.user)
    const { _id, ...eventInfo } = req.body.event;
    const event = await Event.create({
      ...eventInfo,
      createdTimestamp: Date.now(),
      updatedTimestamp: Date.now(),
    });
    const invite = await Invite.create({
      event: event._id,
      mainGuest: req.user._id,
      isOrganiser: true,
      isVIP: true,
      role: 'Organiser',
      attendanceStatus: 'Attending',
      maxAddGuests: 0,
      numberAddGuests: 0,
      guests: req.user._id,
    })
    res.status(201);
    res.send(JSON.stringify(invite));
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
  getEvents,
  getMyEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};

export default EventController;
