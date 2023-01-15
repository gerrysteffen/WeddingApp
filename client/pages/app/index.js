import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import apiCalls from '../../utils/apis/index.js';
import CreateEvent from '../../components/app/CreateEvent.js';
import EventList from '../../components/app/EventList.js';
import UserDashboard from '../../components/app/UserDashboard.js';
import EventDashboard from '../../components/app/EventDashboard.js';
import UserProfile from '../../components/app/UserProfile.js';
import EventDetails from '../../components/app/EventDetails.js';
import EventParticipants from '../../components/app/EventParticipants.js';
import InviteUsers from '../../components/app/InviteUsers.js';

function appIndex() {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [activeEventId, setActiveEventId] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);
  const [mode, setMode] = useState('userDashboard');

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
    setMode: setMode,
    setActiveEventId: setActiveEventId,
    logout: logout,
  };

  // before the user info is retrieved, a loading wheel is displayed - after that the current mode decides what is shown
  return (
    <>
      {!user || (mode.includes('event') && events.length === 0) ? (
        <div>loading...</div>
      ) : (
        <div className='relative max-w-400 h-full flex flex-col justify-center items-center mx-auto'>
          {mode === 'userDashboard' && (
            <UserDashboard util={util} events={events} />
          )}
          {mode === 'userProfile' && <UserProfile util={util} />}
          {mode === 'create' && <CreateEvent util={util} />}
          {mode === 'events' && (
            <EventList util={util} title='All Events' events={events} />
          )}
          {mode === 'myevents' && (
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
          {mode === 'inviteUsers' && (
            <InviteUsers
              util={util}
            />
          )}
        </div>
      )}
    </>
  );
}

export default appIndex;
