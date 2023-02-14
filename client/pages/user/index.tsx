import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BiUser, BiArrowBack, BiMenu, BiX } from 'react-icons/bi';
import apiCalls from '../../utils/apis/index';
import CreateEvent from '../../components/app/CreateEvent';
import EventList from '../../components/app/EventList';
import UserDashboard from '../../components/app/UserDashboard';
import EventDashboard from '../../components/app/EventDashboard';
import UserProfile from '../../components/app/UserProfile';
import EventDetails from '../../components/app/EventDetails';
import EventParticipants from '../../components/app/EventParticipants';
import InviteUsers from '../../components/app/InviteUsers';
import Nav from '../../components/app/Nav';
import ManageEvent from '../../components/app/ManageEvent';
import ManageParticipants from '../../components/app/ManageParticipants';
import ManageEventDetails from '../../components/app/ManageEventDetails';
import ConnectInviteId from '../../components/app/ConnectInviteId';
import CreateEventComms from '../../components/app/CreateEventComms';
import ManageInvites from '../../components/app/ManageInvites';
import ManageEventComms from '../../components/app/ManageEventComms';
import UserRSVPs from '../../components/app/UserRSVPs';
import {
  setAccessToken,
  setUser,
  setEvents,
  setActiveEvent,
} from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../types';

function userIndex() {
  const user = useSelector((state: StateType) => state.user);
  const accessToken = useSelector((state: StateType) => state.accessToken);
  const events = useSelector((state: StateType) => state.events);
  const activeEvent = useSelector((state: StateType) => state.activeEvent);
  const userMode = useSelector((state: StateType) => state.userMode);
  const [activeEventId, setActiveEventId] = useState(null);
  const [mode, setMode] = useState('userDashboard');
  const [navBarMode, setNavBarMode] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  // BELOW: if there is an access token stored get initial user information incl their events,
  // if no access token or no user for access token redirect to login
  // TODO: checks
  useEffect(() => {
    const initialSetup = async () => {
      if (!accessToken || !user) {
        const storedAccessToken = localStorage.getItem('accessToken');
        if (!storedAccessToken) {
          logout();
        } else {
          dispatch(setAccessToken(storedAccessToken));
          const newUser = await apiCalls.getInitialUser(storedAccessToken);
          if (!newUser) {
            logout();
          } else {
            dispatch(setUser(newUser));
            getEvents(storedAccessToken);
            newUser.activeEvent &&
              getActiveEvent(storedAccessToken, newUser.activeEvent);
          }
        }
      } else {
        getEvents(accessToken);
        user.activeEvent && getActiveEvent(accessToken, user.activeEvent);
      }
    };
    initialSetup();
  }, []);

  useEffect(() => {
    const getActiveEvent = async () => {
      const newActiveEvent = await apiCalls.getEvent(
        accessToken,
        activeEventId
      );
      setActiveEvent(newActiveEvent);
    };
    if (activeEventId) getActiveEvent();
  }, [activeEventId, mode]);

  // TODO: checks
  const getEvents = async (accessToken: string) => {
    const userEvents = await apiCalls.getEvents(accessToken);
    dispatch(setEvents(userEvents));
  };

  // TODO: checks
  const getActiveEvent = async (accessToken: string, activeEventId: string) => {
    const newActiveEvent = await apiCalls.getEvent(accessToken, activeEventId);
    dispatch(setActiveEvent(newActiveEvent));
  };

  // DRY logout function
  const logout = () => {
    localStorage.removeItem('accessToken');
    dispatch(setAccessToken(null));
    router.push('./login');
  };

  // Object including the most important functions and information to navigate the app, passed down in each component
  const util = {
    accessToken: accessToken,
    user: user,
    activeEventId: activeEventId,
    setMode: setMode,
    setNavBarMode: setNavBarMode,
    setActiveEventId: setActiveEventId,
    logout: logout,
  };

  const previousPage = {
    userProfile: 'userDashboard',
    userCreate: 'userDashboard',
    connectInviteId: 'userDashboard',
    userEvents: 'userDashboard',
    userMyEvents: 'userDashboard',
    userRSVPs: 'userDashboard',
    eventDashboard: 'userDashboard',
    eventDetails: 'eventDashboard',
    manageEvent: 'eventDashboard',
    eventParticipants: 'eventDashboard',
    manageEventDetails: 'manageEvent',
    manageParticipants: 'manageEvent',
    createEventInvites: 'manageEvent',
    manageEventInvites: 'manageEvent',
    createEventComms: 'manageEvent',
    manageEventComms: 'manageEvent',
  };

  // before the user info is retrieved, a loading wheel is displayed - after that the current mode decides what is shown
  return (
    <>
      {!user || (mode.includes('event') && events.length === 0) ? (
        <div>loading...</div>
      ) : (
        <>
          <div className='absolute top-4 right-4 z-10'>
            <button onClick={() => setNavBarMode(true)}>
              <BiMenu color='gray' size='36px' />
            </button>
          </div>
          <div className='absolute top-5 left-4 z-10'>
            {mode === 'eventDashboard' && (
              <button onClick={() => setMode('userDashboard')}>
                <BiUser color='gray' size='30px' />
              </button>
            )}
            {mode !== 'userDashboard' && mode !== 'eventDashboard' && (
              <button
                onClick={() => setMode(previousPage[mode] || 'userDashboard')}
              >
                <BiArrowBack color='gray' size='30px' />
              </button>
            )}
          </div>
          <div className='relative max-w-400 h-full flex flex-col justify-center items-center mx-auto'>
            {userMode === 'userDashboard' && (
              <UserDashboard />
            )}
            {userMode === 'userProfile' && <UserProfile />}
            {userMode === 'userRSVPs' && (
              <UserRSVPs />
            )}
            {userMode === 'userCreate' && <CreateEvent util={util} />}
            {userMode === 'connectInviteId' && <ConnectInviteId util={util} />}
            {userMode === 'userEvents' && (
              <EventList util={util} title='All Events' events={events} />
            )}
            {userMode === 'userMyEvents' && (
              <EventList
                util={util}
                title='My Events'
                events={events.filter((event) =>
                  (event.organisers as string[]).includes(user._id)
                )}
              />
            )}
            {mode === 'eventDashboard' && (
              <EventDashboard util={util} event={activeEvent} />
            )}
            {mode === 'eventDetails' && (
              <EventDetails util={util} event={activeEvent} />
            )}
            {mode === 'eventParticipants' && (
              <EventParticipants util={util} event={activeEvent} />
            )}
            {mode === 'manageEvent' && (
              <ManageEvent util={util} event={activeEvent} />
            )}
            {mode === 'manageEventDetails' && (
              <ManageEventDetails util={util} event={activeEvent} />
            )}
            {mode === 'manageParticipants' && (
              <ManageParticipants util={util} event={activeEvent} />
            )}
            {mode === 'createEventInvites' && <InviteUsers util={util} />}
            {mode === 'manageEventInvites' && (
              <ManageInvites util={util} event={activeEvent} />
            )}
            {mode === 'createEventComms' && <CreateEventComms util={util} />}
            {mode === 'manageEventComms' && (
              <ManageEventComms util={util} event={activeEvent} />
            )}
          </div>
          {navBarMode && (
            <>
              <div className='absolute top-0 bottom-0 left-0 right-16 z-30 bg-white border-gray border-r-2'>
                <Nav util={util} events={events} event={activeEvent} />
              </div>
              <div className='absolute top-2 right-2 z-30'>
                <button onClick={() => setNavBarMode(false)}>
                  <BiX color='gray' size='48px' />
                </button>
              </div>
              <div className='absolute top-0 bottom-0 left-0 right-0 z-20 bg-white/70 backdrop-blur-sm'></div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default userIndex;
