import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BiUser, BiArrowBack, BiMenu, BiX } from 'react-icons/bi';
import apiCalls from '../../utils/apis/index';
import UserDashboard from '../../components/user/UserDashboard';
import UserProfile from '../../components/user/UserProfile';
import UserRSVPs from '../../components/user/UserRSVPs';
import EventList from '../../components/user/EventList';
import CreateEvent from '../../components/user/CreateEvent';
import ConnectInviteId from '../../components/user/ConnectInviteId';
import NavBar from '../../components/ui-components/NavBar';
//-----------------------------------------------------------------
import EventDashboard from '../../components/event/EventDashboard';
import EventDetails from '../../components/event/EventDetails';
import EventParticipants from '../../components/event/EventParticipants';
import InviteUsers from '../../components/event/InviteUsers';
import ManageEvent from '../../components/event/ManageEvent';
import ManageParticipants from '../../components/event/ManageParticipants';
import ManageEventDetails from '../../components/event/ManageEventDetails';
import CreateEventComms from '../../components/event/CreateEventComms';
import ManageInvites from '../../components/event/ManageInvites';
import ManageEventComms from '../../components/event/ManageEventComms';
// import NavBar from '../../components/ui-components/NavBar';
//-----------------------------------------------------------------
import {
  setAccessToken,
  setUser,
  setEvents,
  setNavBarMode,
  resetState,
  setUserMode,
} from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../types';

function userIndex() {
  const user = useSelector((state: Store) => state.user);
  const accessToken = useSelector((state: Store) => state.accessToken);
  const events = useSelector((state: Store) => state.events);
  const activeEvent = useSelector((state: Store) => state.activeEvent);
  const userMode = useSelector((state: Store) => state.userMode);
  const navBarMode = useSelector((state: Store) => state.navBarMode);

  const router = useRouter();
  const dispatch = useDispatch();

  // BELOW: if there is an access token stored get initial user information incl their events,
  // if no access token or no user for access token redirect to login
  // TODO: res structure
  useEffect(() => {
    const initialSetup = async () => {
      if (!accessToken || !user) {
        const storedAccessToken = localStorage.getItem('accessToken');
        if (!storedAccessToken) {
          logout();
        } else {
          const res = await apiCalls.getInitialUser(storedAccessToken);
          if (res.error) {
            logout();
          } else {
            dispatch(setAccessToken(storedAccessToken));
            dispatch(setUser(res));
            getEvents(storedAccessToken);
          }
        }
      } else {
        getEvents(accessToken);
      }
    };
    initialSetup();
  }, []);

  // TODO: response structure
  const getEvents = async (accessToken: string) => {
    const res = await apiCalls.getEvents(accessToken);
    if (res.error) {
      logout();
    } else {
      dispatch(setEvents(res));
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    dispatch(resetState());
    router.push('./login');
  };

  // before the user info is retrieved, a loading wheel is displayed - after that the current mode decides what is shown
  return (
    <>
      {!user || (userMode.includes('event') && events.length === 0) ? (
        <div>loading...</div>
      ) : (
        <>
          <div className='absolute top-4 right-4 z-10'>
            <button onClick={() => dispatch(setNavBarMode(true))}>
              <BiMenu color='gray' size='36px' />
            </button>
          </div>
          <div className='absolute top-5 left-4 z-10'>
            {userMode !== 'userDashboard' && (
              <button
                onClick={() => dispatch(setUserMode('userDashboard'))}
              >
                <BiArrowBack color='gray' size='30px' />
              </button>
            )}
          </div>
          <div className='relative max-w-400 h-full flex flex-col justify-center items-center mx-auto'>
            {userMode === 'userDashboard' && <UserDashboard />}
            {userMode === 'userProfile' && <UserProfile />}
            {userMode === 'userRSVPs' && <UserRSVPs />}
            {userMode === 'userEvents' && <EventList title='All Events' />}
            {userMode === 'userMyEvents' && <EventList title='My Events' />}
            {userMode === 'userCreate' && <CreateEvent />}
            {userMode === 'connectInviteId' && <ConnectInviteId />}
          </div>
          {navBarMode && (
            <>
              <div className='absolute top-0 bottom-0 left-0 right-16 z-30 bg-white border-gray border-r-2'>
                <NavBar />
              </div>
              <div className='absolute top-2 right-2 z-30'>
                <button onClick={() => dispatch(setNavBarMode(false))}>
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
