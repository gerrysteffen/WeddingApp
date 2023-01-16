import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BiUser, BiArrowBack, BiMenu, BiX } from 'react-icons/bi';
import apiCalls from '../../utils/apis/index.js';
import CreateEvent from '../../components/app/CreateEvent.js';
import EventList from '../../components/app/EventList.js';
import UserDashboard from '../../components/app/UserDashboard.js';
import EventDashboard from '../../components/app/EventDashboard.js';
import UserProfile from '../../components/app/UserProfile.js';
import EventDetails from '../../components/app/EventDetails.js';
import EventParticipants from '../../components/app/EventParticipants.js';
import InviteUsers from '../../components/app/InviteUsers.js';
import Nav from '../../components/app/Nav.js';
import ManageEvent from '../../components/app/ManageEvent.js';
import ManageParticipants from '../../components/app/ManageParticipants.js';
import ManageEventDetails from '../../components/app/ManageEventDetails.js';
import ConnectInviteId from '../../components/app/ConnectInviteId.js';

function appIndex() {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [activeEventId, setActiveEventId] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);
  const [mode, setMode] = useState('userDashboard');
  const [navBarMode, setNavBarMode] = useState(false);

  const router = useRouter();

  // BELOW: if there is an access token stored get initial user information incl their events,
  // if no access token or no user for access token redirect to login
  useEffect(() => {
    const initialSetup = async () => {
      const newAccessToken = localStorage.getItem('accessToken');
      setAccessToken(newAccessToken);
      if (!newAccessToken) {
        logout();
      } else {
        const newUser = await apiCalls.getInitialUser(newAccessToken);
        if (newUser) {
          setUser(newUser);
          const userEvents = await apiCalls.getEvents(newAccessToken);
          setEvents(userEvents);
        } else {
          logout();
        }
      }
    };
    initialSetup();
  }, [mode]);

  useEffect(() => {
    const getActiveEvent = async () => {
      const newActiveEvent = await apiCalls.getEvent(
        accessToken,
        activeEventId
      );
      setActiveEvent(newActiveEvent);
    };
    if (activeEventId) getActiveEvent();
  }, [activeEventId]);

  // DRY logout function
  const logout = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
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
    eventDashboard: 'userDashboard',
    eventDetails: 'eventDashboard',
    manageEvent: 'eventDashboard',
    eventParticipants: 'eventDashboard',
    manageEventDetails: 'manageEvent',
    manageParticipants: 'manageEvent',
    createEventInvites: 'manageEvent',
  }

  // before the user info is retrieved, a loading wheel is displayed - after that the current mode decides what is shown
  return (
    <>
      {!user || (mode.includes('event') && events.length === 0) ? (
        <div>loading...</div>
      ) : (
        <>
          <div className='absolute top-4 right-4 z-10'><button onClick={()=>setNavBarMode(true)}><BiMenu color='gray' size='36px' /></button></div>
          <div className='absolute top-5 left-4 z-10'>
            {mode === 'eventDashboard' && <button onClick={()=>setMode('userDashboard')}><BiUser color='gray' size='30px' /></button>}
            {mode !== 'userDashboard' && mode !== 'eventDashboard' && <button onClick={()=>setMode(previousPage[mode]||'userDashboard')}><BiArrowBack color='gray' size='30px' /></button>}
          </div>
          <div className='relative max-w-400 h-full flex flex-col justify-center items-center mx-auto'>
            {mode === 'userDashboard' && (
              <UserDashboard util={util} events={events} />
            )}
            {mode === 'userProfile' && <UserProfile util={util} />}
            {mode === 'userCreate' && <CreateEvent util={util} />}
            {mode === 'connectInviteId' && <ConnectInviteId util={util} />}
            {mode === 'userEvents' && (
              <EventList util={util} title='All Events' events={events} />
            )}
            {mode === 'userMyEvents' && (
              <EventList
                util={util}
                title='My Events'
                events={events.filter((event) =>
                  event.organisers.includes(user._id)
                )}
              />
            )}
            {mode === 'eventDashboard' && (
              <EventDashboard
                util={util}
                event={activeEvent}
              />
            )}
            {mode === 'eventDetails' && (
              <EventDetails
                util={util}
                event={activeEvent}
              />
            )}
            {mode === 'eventParticipants' && (
              <EventParticipants
                util={util}
                event={activeEvent}
              />
            )}
            {mode === 'manageEvent' && (
              <ManageEvent
              util={util}
              event={activeEvent}
              />
              )}
              {mode === 'manageEventDetails' && (
                <ManageEventDetails
                  util={util}
                  event={activeEvent}
                />
              )}
              {mode === 'manageParticipants' && (
                <ManageParticipants
                  util={util}
                  event={activeEvent}
                />
              )}
            {mode === 'createEventInvites' && (
              <InviteUsers
                util={util}
              />
            )}
          </div>
          {navBarMode && (
            <>
              <div className='absolute top-0 bottom-0 left-0 right-16 z-30 bg-white border-gray border-r-2'>
                <Nav util={util} events={events} event={activeEvent} />
              </div>
              <div className='absolute top-2 right-2 z-30'><button onClick={()=>setNavBarMode(false)}><BiX color='gray' size='48px' /></button></div>
              <div className='absolute top-0 bottom-0 left-0 right-0 z-20 bg-white/70 backdrop-blur-sm'></div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default appIndex;
