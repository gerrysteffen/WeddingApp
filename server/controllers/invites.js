'use strict';

import Invite from '../models/invites.js';

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
    const { _id } = req.body.invite;
    const invite = await Invite.find({ _id: _id });
    res.status(200);
    res.send(JSON.stringify(invite));
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
  updateInvite,
  deleteInvite,
};

export default InviteController;