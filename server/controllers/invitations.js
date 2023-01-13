'use strict';

import Invitation from '../models/invitations.js';

const getAllInvitations = async (req, res) => {
  try {
    const invitations = await Invitation.find({});
    res.status(200);
    res.send(JSON.stringify(invitations));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getInvitation = async (req, res) => {
  try {
    const { _id } = req.body.invitation;
    const invitation = await Invitation.find({ _id: _id });
    res.status(200);
    res.send(JSON.stringify(invitation));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createInvitation = async (req, res) => {
  try {
    const { _id, ...invitationInfo } = req.body.invitation;
    const invitation = await Invitation.create({
      ...invitationInfo,
    });
    res.status(201);
    res.send(JSON.stringify(invitation));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateInvitation = async (req, res) => {
  try {
    const { _id, ...invitationInfo } = req.body.invitation;
    await Invitation.updateOne(
      { _id: _id },
      {
        ...invitationInfo,
      }
    );
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteInvitation = async (req, res) => {
  try {
    const { _id } = req.body.invitation;
    await Invitation.deleteOne({ _id: _id });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const InvitationController = {
  getAllInvitations,
  getInvitation,
  createInvitation,
  updateInvitation,
  deleteInvitation,
};

export default InvitationController;