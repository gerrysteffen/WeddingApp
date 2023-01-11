"use strict";

import express from "express";

const router = express.Router();

import EventController from "./controllers/events.js";
router.get('/event', EventController.getEvent)
router.post('/event', EventController.createEvent)
router.put('/event', EventController.updateEvent)
router.delete('/event', EventController.deleteEvent)
router.post('/events', EventController.getAllEvents)

import UserController from "./controllers/users.js";
router.get('/user', UserController.getUser)
router.post('/user', UserController.createUser)
router.put('/user', UserController.updateUser)
router.delete('/user', UserController.deleteUser)
router.post('/users', UserController.getAllUsers)

export default router;