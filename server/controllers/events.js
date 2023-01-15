'use strict';

import Event from '../models/events.js';
import Invite from '../models/invites.js';
import User from '../models/users.js';

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

// const getManyEventsFromUser = async (req, res) => {
//   try {
//     const userInvites = await Invite.find({guests: req.user._id}).select('event -_id')
//     const eventIds = userInvites.map((invite)=>invite.event)
//     const events = await Event.find({_id: {$in: eventIds}});
//     res.status(200);
//     res.send(JSON.stringify(events));
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// };

const getEvents = async (req, res) => {
  try {
    const userInvites = await Invite.find({ guests: req.user._id }).select(
      'event -_id'
    );
    const eventIds = userInvites.map((invite) => invite.event);
    const events = await Event.find({ _id: { $in: eventIds } });
    res.status(200);
    res.send(JSON.stringify(events));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

// const getMyEvents = async (req, res) => {
//   try {
//     const userInvites = await Invite.find({mainGuest: req.user._id}).select('event -_id')
//     const eventIds = userInvites.map((invite)=>invite.event)
//     const events = await Event.find({_id: {$in: eventIds}});
//     res.status(200);
//     res.send(JSON.stringify(events));
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// };

const getEvent = async (req, res) => {
  try {
    const _id = req.params.eventid;
    const event = await Event.findOne({ _id: _id })
      .populate('eventComms')
      .populate([
        {
          path: 'invites',
          model: 'invite',
          populate: [
            {
              path: 'guests',
              model: 'user'
            },
            {
              path: 'mainGuest',
              model: 'user',
            },
          ],
        },{
          path: 'eventComms',
          model: 'comm'
        }
      ])
    res.status(200).send(JSON.stringify(event));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createEvent = async (req, res) => {
  try {
    const { _id, ...eventInfo } = req.body.event;
    let event = await Event.create({
      ...eventInfo,
      organisers: [req.user._id],
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
    });
    event = await Event.findOneAndUpdate(
      { _id: event._id },
      { $push: { invites: invite } }
    );
    await User.updateOne({ _id: req.user._id }, { $push: { invites: invite } });
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
    let event = await Event.findOne({ _id: _id });
    if (!event) {
      res
        .status(406)
        .send(JSON.stringify({ error: '406', message: 'False request.' }));
    } else {
      if (!event.organisers.includes(req.user._id)) {
        res
          .status(401)
          .send(JSON.stringify({ error: '401', message: 'Not authorized.' }));
      } else {
        event = await Event.findOneAndUpdate(
          { _id: _id },
          {
            ...eventInfo,
          },
          {
            new: true,
          }
        );
        res.status(202).send(JSON.stringify(event));
      }
    }
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
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};

export default EventController;
