import React from 'react';
import Styles from '../../utils/styles';
import { BiX, BiLogOut } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../types';
import { resetState, setAccessToken, setEventMode, setEvents, setNavBarMode, setUser, setUserMode } from '../../store/actions';
import { useRouter } from 'next/router';

function NavBar() {
  const user = useSelector((state: Store) => state.user);
  const events = useSelector((state: Store) => state.events);
  const activeEvent = useSelector((state: Store) => state.activeEvent);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSelect = (component, mode) => {
    if (component = 'user') {
      router.push('../user/');
      dispatch(setUserMode(mode))
    } else if (component = 'event') {
      router.push(`../event/${activeEvent._id}`);
      dispatch(setEventMode(mode))
    }
    dispatch(setNavBarMode(false));
  }

  const logout = () => {
    localStorage.removeItem('accessToken');
    dispatch(resetState());
    router.push('./login');
  };

  return (
    <div className='w-full h-full flex flex-col justify-between items-start p-2'>
      <div className='flex flex-col justify-start w-full'>
        <div className={Styles.navbarTitle}>
          <div className='font-bold'>User Options</div>
          <div className='ml-2'>
            {'- ' + user.firstName + ' ' + user.lastName}
          </div>
        </div>
        <button
          className={Styles.navbarContent}
          onClick={() => {
            handleSelect('user', 'userDashboard');
          }}
        >
          Dashboard
        </button>
        <button
          className={Styles.navbarContent}
          onClick={() => {
            handleSelect('user', 'userProfile');
          }}
        >
          My Profile
        </button>
        <button
          className={Styles.navbarContent}
          disabled={events.length > 0 ? false : true}
          onClick={() => {
            handleSelect('user', 'userEvents');
          }}
        >
          Events
        </button>
        <button
          className={Styles.navbarContent}
          disabled={events.length > 0 ? false : true}
          onClick={() => {
            handleSelect('user', 'userMyEvents');
          }}
        >
          My Events
        </button>
        <button
          className={Styles.navbarContent}
          disabled={events.length > 0 ? false : true}
          onClick={() => {
            handleSelect('user', 'userCreate');
          }}
        >
          Create Event
        </button>
        <button
          className={Styles.navbarContent}
          disabled={events.length > 0 ? false : true}
          onClick={() => {
            handleSelect('user', 'connectInviteId');
          }}
        >
          Connect Event with Invite ID
        </button>
        <div className={Styles.navbarTitle}>
          <div className='font-bold'>Event Options</div>
          {activeEvent && <div className='ml-2'>{'- ' + activeEvent.name}</div>}
        </div>
        {activeEvent ? (
          <>
            <button
              onClick={() => {
                handleSelect('event', 'eventDashboard');
              }}
              className={Styles.navbarContent}
            >
              Event Dashboard
            </button>
            <button
              onClick={() => {
                handleSelect('event', 'eventDetails');
              }}
              className={Styles.navbarContent}
            >
              Event Details
            </button>
            <button
              onClick={() => {
                handleSelect('event', 'eventParticipants');
              }}
              className={Styles.navbarContent}
            >
              Participants
            </button>
            <button
              onClick={() => {
                handleSelect('event', 'manageEvent');
              }}
              disabled={(activeEvent.organisers.includes(user._id)) ? false : true}
              className={Styles.navbarContent}
            >
              Manage Event
            </button>
          </>
        ) : (
          <div className={Styles.navbarNoContent}>Please select an event</div>
        )}
      </div>
      <div className='flex flex-col justify-start w-full'>
        <button
          className={Styles.navbarBottom}
          onClick={() => {
            dispatch(setNavBarMode(false));
          }}
        >
          <BiX size='36px' />
          Exit
        </button>
        <button
          className={Styles.navbarBottom + ' mb-4 border-t-4'}
          onClick={() => {
            logout();
          }}
        >
          <BiLogOut size='30px' className='mr-2' /> Logout
        </button>
      </div>
    </div>
  );
}

export default NavBar;
