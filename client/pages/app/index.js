import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import apiCalls from '../../utils/apis/index.js';
import CreateEvent from '../../components/app/CreateEvent.js';
import EventList from '../../components/app/EventList.js';
import UserDashboard from '../../components/app/UserDashboard.js';
import EventDashboard from '../../components/app/EventDashboard.js';
import UserProfile from '../../components/app/UserProfile.js';

function appIndex(props) {
  const [accessToken, setAccessToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState(null);
  const [mode, setMode] = useState('userDashboard');
  const [ready, setReady] = useState(false);

  const router = useRouter();

  // BELOW: if there is an access token stored get initial user information incl their events,
  // if no access token or no user for access token redirect to login
  useEffect(() => {
    setReady(false)
    const initialSetup = async () => {
      const newAccessToken = localStorage.getItem('accessToken');
      setAccessToken(newAccessToken);
      if (!newAccessToken) {
        logout();
      } else {
        const user = await apiCalls.getInitialUser(newAccessToken);
        if (user) {
          setCurrentUser(user);
          const userEvents = await apiCalls.getEvents(newAccessToken);
          setEvents(userEvents);
          setReady(true)
        } else {
          logout();
        }
      }
    };
    initialSetup();
  }, [mode]);

  // useEffect(()=>{
  //   setReady(true)
  // },[events])

  // DRY logout function
  const logout = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
    router.push('./login');
  };

  // Object including the most important functions and information to navigate the app, passed down in each component
  const util = {
    accessToken: accessToken,
    currentUser: currentUser,
    setMode: setMode,
    setActiveEvent: setActiveEvent,
    logout: logout,
  };

  // before the user info is retrieved, a loading wheel is displayed - after that the current mode decides what is shown
  return (
    <>
      {(!ready && (mode !== 'eventDashboard' || events.length>0)) ? (
        <div>Loading</div>
      ) : (
        <div className='relative max-w-400 h-full flex flex-col justify-center items-center mx-auto'>
          {mode === 'userDashboard' && (
            <UserDashboard util={util} />
          )}
          {mode === 'userProfile' && (
            <UserProfile util={util} />
          )}
          {mode === 'createEvent' && <CreateEvent util={util} />}
          {mode === 'events' && (
            <EventList util={util} title='All Events' events={events} />
          )}
          {mode === 'myEvents' && (
            <EventList util={util} title='My Events' events={events.filter((event) => event.organisers.includes(currentUser._id)
              )}
            />
          )}
          {mode === 'eventDashboard' && (
            <EventDashboard util={util} event={events.find((event)=>event._id === activeEvent)} />
          )}
        </div>
      )}
    </>
  );
}

export default appIndex;
