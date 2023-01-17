'use strict';

import User from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'Hello world.';

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200);
    res.send(JSON.stringify(users));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getUser = async (req, res) => {
  try {
    let _id;
    if (req.body.user) {
      _id = req.body.user._id;
    } else {
      _id = req.user;
    }
    let user;
    if (_id) {
      const userList = await User.find({ _id: _id }).select('-password');
      user = userList[0];
      user && res.status(200).send(JSON.stringify(user));
    }
    if (!_id || !user)
      res
        .status(406)
        .send(JSON.stringify({ error: '406', message: 'False request.' }));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createUser = async (req, res) => {
  try {
    const { _id, email, password, ...userInfo } = req.body.user;
    const previousUser = await User.findOne({ email: email });
    if (previousUser && previousUser.active) {
      res.status(409);
      res.send(
        JSON.stringify({ error: '409', message: 'User already exists' })
      );
    } else if (
      !email ||
      !password ||
      !userInfo.firstName ||
      !userInfo.lastName
    ) {
      res.status(400).send(
        JSON.stringify({
          error: '400',
          message: 'Could not create user - data missing',
        })
      );
    } else {
      const hash = await bcrypt.hash(password, 10);
      let user;
      if (previousUser && !previousUser.active) {
        user = await User.findOneAndUpdate({ _id: previousUser._id }, {
          password: hash,
          active: true,
          ...userInfo,
        },{
          new: true,
        });
      } else {
        user = await User.create({
          email,
          password: hash,
          active: true,
          ...userInfo,
        });
      }
      const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
      res.status(201).send(JSON.stringify({ accessToken }));
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id, password, ...userInfo } = req.body.user;
    if (_id == req.user._id) {
      const user = await User.findOneAndUpdate(
        { _id: _id },
        {
          ...userInfo,
        },
        {
          new: true,
        }
      ).select('-password');
      res.status(202).send(JSON.stringify(user));
    } else {
      res
        .status(401)
        .send(JSON.stringify({ error: '401', message: 'Not authorized' }));
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body.user;
    const user = await User.findOne({ email: email });
    if (!user) {
      res
        .status(401)
        .send(
          JSON.stringify({
            error: '401',
            message: 'Username or password is incorrect',
          })
        );
    } else {
      const validation = await bcrypt.compare(password, user.password);
      if (!validation) {
        res
          .status(401)
          .send(
            JSON.stringify({
              error: '401',
              message: 'Username or password is incorrect',
            })
          );
      } else if (validation) {
        const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
        res.status(200).send(JSON.stringify({ accessToken }));
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const changePassword = async (req, res) => {
  try {
    const { _id, oldPassword, newPassword } = req.body.user;
    if (_id != req.user._id) {
      res
        .status(401)
        .send(JSON.stringify({ error: '401', message: 'Not authorized' }));
    } else {
      const user = await User.findOne({ _id: _id });
      if (!user) {
        res
          .status(401)
          .send(JSON.stringify({ error: '400', message: 'User not found' }));
      } else {
        const validation = await bcrypt.compare(oldPassword, user.password);
        if (!validation) {
          res
            .status(401)
            .send(
              JSON.stringify({
                error: '401',
                message: 'Old password is incorrect',
              })
            );
        } else if (validation) {
          const hash = await bcrypt.hash(newPassword, 10);
          await User.findOneAndUpdate(
            { _id: _id },
            {
              password: hash,
            },
            {
              new: true,
            }
          ).select('-password');
          res
            .status(202)
            .send(JSON.stringify({ message: 'Password successfully changed' }));
        }
      }
    }
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
  loginUser,
  changePassword,
};

export default UserController;
