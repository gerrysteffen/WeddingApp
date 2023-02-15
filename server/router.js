'use strict';

import express from 'express';
import authMiddleware from './middlewares/auth.js';
import conditionalAuthMiddleware from './middlewares/condAuth.js';

const router = express.Router();
    
import EventController from './controllers/events.js';
router.get('/event/:eventid', conditionalAuthMiddleware, EventController.getEvent);//!used
router.get('/publicevent/:eventid', EventController.getPublicEvent);//!used
router.post('/event', authMiddleware, EventController.createEvent); //! used
router.put('/event', authMiddleware, EventController.updateEvent);
router.delete('/event', authMiddleware, EventController.deleteEvent);
router.get('/events', authMiddleware, EventController.getEvents); //! used

import UserController from './controllers/users.js';
router.get('/user', authMiddleware, UserController.getUser); //! used
router.post('/user', UserController.createUser); //! used
router.put('/user', authMiddleware, UserController.updateUser); //! used
router.post('/login', UserController.loginUser); //! used
router.put('/changepw', authMiddleware, UserController.changePassword); //! used

import InviteController from './controllers/invites.js';
router.get('/invite/:invid', InviteController.getInvite); //! used
router.post('/invites', authMiddleware, InviteController.createInvites); //! used
router.put('/invitersvp', InviteController.updateInviteWithRSVP); //!used
router.delete('/invite', InviteController.deleteInvite);
router.put('/invites', InviteController.getManyInvites); //!used

import CommController from './controllers/comms.js';
router.get('/comm', authMiddleware, CommController.getComm);
router.post('/comm', authMiddleware, CommController.createComm);  //! used
router.put('/comm', authMiddleware, CommController.updateComm);
router.delete('/comm', authMiddleware, CommController.deleteComm);
router.get('/comms', authMiddleware, CommController.getAllComms);

export default router;
