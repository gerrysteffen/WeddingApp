'use strict';

import express from 'express';

const router = express.Router();

import EventController from './controllers/events.js';
router.get('/event', EventController.getEvent);
router.post('/event', EventController.createEvent);
router.put('/event', EventController.updateEvent);
router.delete('/event', EventController.deleteEvent);
router.get('/events', EventController.getAllEvents);

import UserController from './controllers/users.js';
router.get('/user', UserController.getUser);
router.post('/user', UserController.createUser);
router.put('/user', UserController.updateUser);
router.delete('/user', UserController.deleteUser);
router.get('/users', UserController.getAllUsers);
router.post('/login', UserController.loginUser);

import InvitationController from './controllers/invitations.js';
router.get('/ep', InvitationController.getInvitation);
router.post('/ep', InvitationController.createInvitation);
router.put('/ep', InvitationController.updateInvitation);
router.delete('/ep', InvitationController.deleteInvitation);
router.get('/eps', InvitationController.getAllInvitations);

import RSVPController from './controllers/rsvp.js';
router.get('/rsvp', RSVPController.getRSVP);
router.post('/rsvp', RSVPController.createRSVP);
router.put('/rsvp', RSVPController.updateRSVP);
router.delete('/rsvp', RSVPController.deleteRSVP);
router.get('/rsvps', RSVPController.getAllRSVPs);

import CommController from './controllers/comms.js';
router.get('/comm', CommController.getComm);
router.post('/comm', CommController.createComm);
router.put('/comm', CommController.updateComm);
router.delete('/comm', CommController.deleteComm);
router.get('/comms', CommController.getAllComms);

export default router;
