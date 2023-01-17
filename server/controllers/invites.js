'use strict';

import mongoose, { Mongoose } from 'mongoose';
import Event from '../models/events.js';
import Invite from '../models/invites.js';
import RSVP from '../models/rsvp.js';
import User from '../models/users.js';

const getManyInvites = async (req, res) => {
  try {
    const inviteIds = req.body.invites;
    // const inviteIds = ffInviteIds.map((field)=> mongoose.Types.ObjectId(field))
    const invites = await Invite.find({ _id: { $in: inviteIds } }).populate('event');
    console.log(invites);
    res.status(200);
    res.send(JSON.stringify(invites));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getInvite = async (req, res) => {
  try {
    const _id = req.params.invid;
    if (!Mongoose.prototype.isValidObjectId(_id)) {
      res
        .status(400)
        .send(JSON.stringify({ error: '400', message: 'Invalid ID.' }));
    } else {
      const invite = await Invite.findOne({ _id: _id }).populate([
        {
          path: 'event',
          model: 'event',
        },
        {
          path: 'mainGuest',
          model: 'user',
        },
        {
          path: 'guests',
          model: 'user',
        },
        {
          path: 'rsvps',
          model: 'rsvp',
        },
      ]);
      if (!invite) {
        res
          .status(400)
          .send(
            JSON.stringify({ error: '400', message: 'Invitation not found.' })
          );
      } else {
        res.status(200);
        res.send(JSON.stringify(invite));
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createInvite = async (req, res) => {
  try {
    const { _id, ...inviteInfo } = req.body.invite;
    const invite = await Invite.create({
      ...inviteInfo,
    });
    res.status(201);
    res.send(JSON.stringify(invite));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createInvites = async (req, res) => {
  try {
    const data = req.body;
    const inviteIds = await Promise.all(
      data.map(async (dataPoint) => {
        const userInfo = dataPoint.user;
        let user = await User.findOne({ email: userInfo.email }).select(
          '-password'
        );
        if (!user) {
          user = await User.create({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
          });
        }
        const previousInvite = await Invite.findOne({
          event: dataPoint.invite.event,
          mainGuest: user._id,
        });
        if (!previousInvite) {
          const inviteInfo = {
            ...dataPoint.invite,
            mainGuest: user._id,
            attendanceStatus: 'No Response',
            guests: [user._id],
          };
          const invite = await Invite.create({ ...inviteInfo });
          await User.findOneAndUpdate(
            { _id: user._id },
            {
              $push: { invites: invite._id },
            },
            {
              new: true,
            }
          );
          await Event.findOneAndUpdate(
            { _id: dataPoint.invite.event },
            {
              $push: { invites: invite._id },
            },
            {
              new: true,
            }
          );
          return invite._id;
        }
        if (previousInvite) {
          return 'already existed';
        }
      })
    );
    res.status(201);
    res.send(JSON.stringify(inviteIds));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateInvite = async (req, res) => {
  try {
    const { _id, ...inviteInfo } = req.body.invite;
    const invite = await Invite.findOneAndUpdate(
      { _id: _id },
      {
        ...inviteInfo,
      },
      {
        new: true,
      }
    );
    res.status(202).send(JSON.stringify(invite));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateInviteWithRSVP = async (req, res) => {
  try {
    const invite = req.body.invite;
    const users = req.body.users;
    const rsvps = req.body.rsvps;
    const userIds = await Promise.all(
      users.map(async (user, index) => {
        const { _id, ...userInfo } = user;
        if (_id) {
          if (userInfo.invites && userInfo.invites.includes(invite._id)) {
            User.updateOne(
              { _id: _id },
              {
                ...userInfo,
              }
            );
          } else {
            User.updateOne(
              { _id: _id },
              {
                ...userInfo,
                $push: { invites: invite._id },
              }
            );
          }
          return _id;
        } else {
          const newUser = await User.create({
            ...userInfo,
            invites: [invite._id],
          });
          return newUser._id;
        }
      })
    );
    invite.guests = userIds;

    const rsvpIds = await Promise.all(
      rsvps.map(async (rsvp, index) => {
        const { _id, ...rsvpInfo } = rsvp;
        if (_id) {
          RSVP.updateOne(
            { _id: _id },
            {
              ...rsvpInfo,
              attendanceStatus: invite.attendanceStatus,
              user: userIds[index],
              invite: invite._id,
            }
          );
          return _id;
        } else {
          const newRSVP = await RSVP.create({
            ...rsvpInfo,
            user: userIds[index],
            invite: invite._id,
          });
          return newRSVP._id;
        }
      })
    );
    invite.rsvps = rsvpIds;

    const { _id, ...inviteInfo } = invite;
    const newInvite = await Invite.findOneAndUpdate(
      { _id: _id },
      {
        ...inviteInfo,
      },
      {
        new: true,
      }
    ).populate(['rsvps', 'guests']);
    res.status(202).send(JSON.stringify(newInvite));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteInvite = async (req, res) => {
  try {
    const { _id } = req.body.invite;
    await Invite.deleteOne({ _id: _id });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const InviteController = {
  getManyInvites,
  getInvite,
  createInvite,
  createInvites,
  updateInviteWithRSVP,
  updateInvite,
  deleteInvite,
};

export default InviteController;
