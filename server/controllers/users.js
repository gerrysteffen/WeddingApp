'use strict';

import { User } from '../models/users.js';

const getAllUsers = async (req, res) => {
  try {
    await User.find({});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getUser = async (req, res) => {
  try {
    await User.find({ userId: id });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createUser = async (req, res) => {
  try {
    await User.create({
      eventId,
      eventName,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateUser = async (req, res) => {
  try {
    await User.updateOne(
      { userId: id },
      {
        // eventName: eventName,
      }
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ userId: id });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const UserController = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}

export default UserController