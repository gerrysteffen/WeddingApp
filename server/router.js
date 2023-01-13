'use strict';

import express from 'express';
import authMiddleware from './middlewares/auth.js';

const router = express.Router();

import EventController from './controllers/events.js';
router.get('/event', authMiddleware, EventController.getEvent);
router.post('/event', authMiddleware, EventController.createEvent); //! used
router.put('/event', authMiddleware, EventController.updateEvent);
router.delete('/event', authMiddleware, EventController.deleteEvent);
router.get('/events', authMiddleware, EventController.getEvents); //! used
router.get('/allevents', authMiddleware, EventController.getAllEvents);
router.get('/myevents', authMiddleware, EventController.getMyEvents); //! used

import UserController from './controllers/users.js';
router.get('/user', authMiddleware, UserController.getUser); //! used
router.post('/user', UserController.createUser); //! used
router.put('/user', authMiddleware, UserController.updateUser);
router.delete('/user', authMiddleware, UserController.deleteUser);
router.get('/users', authMiddleware, UserController.getAllUsers);
router.post('/login', UserController.loginUser); //! used

import InviteController from './controllers/invites.js';
router.get('/invite', InviteController.getInvite);
router.post('/invite', InviteController.createInvite);
router.put('/invite', InviteController.updateInvite);
router.delete('/invite', InviteController.deleteInvite);
router.get('/invites', InviteController.getAllInvites);

import RSVPController from './controllers/rsvp.js';
router.get('/rsvp', RSVPController.getRSVP);
router.post('/rsvp', RSVPController.createRSVP);
router.put('/rsvp', RSVPController.updateRSVP);
router.delete('/rsvp', RSVPController.deleteRSVP);
router.get('/rsvps', RSVPController.getAllRSVPs);

import CommController from './controllers/comms.js';
router.get('/comm', authMiddleware, CommController.getComm);
router.post('/comm', authMiddleware, CommController.createComm);
router.put('/comm', authMiddleware, CommController.updateComm);
router.delete('/comm', authMiddleware, CommController.deleteComm);
router.get('/comms', authMiddleware, CommController.getAllComms);

export default router;
