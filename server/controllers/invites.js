'use strict';

import { Mongoose } from 'mongoose';
import Event from '../models/events.js';
import Invite from '../models/invites.js';
import User from '../models/users.js';

const getAllInvites = async (req, res) => {
  try {
    const invites = await Invite.find({});
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
    if(!Mongoose.prototype.isValidObjectId(_id)) {
      res.status(400).send(JSON.stringify({error:'400',message:'Invalid ID.'}))
    } else {
      const invite = await Invite.findOne({ _id: _id })
        .populate([
          {
            path: 'event',
            model: 'event',
          },{
            path: 'mainGuest',
            model: 'user'
          },{
            path: 'guests',
            model: 'user'
          },{
            path: 'rsvps',
            model: 'rsvp'
          }
        ]);
      if (!invite) {
        res.status(400).send(JSON.stringify({error:'400',message:'Invitation not found.'}))
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
            attendanceStatus: 'No response',
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
        } if (previousInvite) {
          return 'already existed'
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
    await Invite.updateOne(
      { _id: _id },
      {
        ...inviteInfo,
      }
    );
    res.sendStatus(204);
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
  getAllInvites,
  getInvite,
  createInvite,
  createInvites,
  updateInvite,
  deleteInvite,
};

export default InviteController;
