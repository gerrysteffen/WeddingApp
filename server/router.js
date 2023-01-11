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

import EPController from './controllers/eventParticipations.js';
router.get('/ep', EPController.getEP);
router.post('/ep', EPController.createEP);
router.put('/ep', EPController.updateEP);
router.delete('/ep', EPController.deleteEP);
router.get('/eps', EPController.getAllEPs);

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
