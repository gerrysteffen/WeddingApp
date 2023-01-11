'use strict';

import User from '../models/users.js';

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200);
    res.send(JSON.stringify(users));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getUser = async (req, res) => {
  try {
    const { _id } = req.body.user;
    const user = await User.find({ _id: _id });
    res.status(200);
    res.send(JSON.stringify(user));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createUser = async (req, res) => {
  try {
    const { _id, ...userInfo } = req.body.user;
    const user = await User.create({
      ...userInfo,
    });
    res.status(201);
    res.send(JSON.stringify(user));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id, ...userInfo } = req.body.user;
    await User.updateOne(
      { _id: _id },
      {
        ...userInfo,
      }
    );
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { _id } = req.body.user;
    await User.deleteOne({ _id: _id });
    res.sendStatus(204);
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
  deleteUser,
};

export default UserController;
