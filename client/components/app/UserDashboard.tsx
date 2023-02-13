import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Styles from '../../utils/styles';
import { StateType } from '../../types';
import { setAccessToken, setUserMode } from '../../store/actions';
import { useRouter } from 'next/router';

function UserDashboard() {
  const user = useSelector((state: StateType) => state.user);
  const events = useSelector((state: StateType) => state.events);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = (userMode: string) => {
    dispatch(setUserMode(userMode));
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    dispatch(setAccessToken(null));
    router.push('./login');
  };

  return (
    <>
      <h1 className={Styles.title}>Hello {user.firstName || 'Stranger'}</h1>
      <div className={Styles.bodyContainer}>
        <div className='italic text-center'>
          <div>Browse your profile and events...</div>
        </div>
        <button
          className={Styles.buttonLong}
          onClick={() => {
            handleClick('userProfile');
          }}
        >
          My Profile
        </button>
        <button
          className={Styles.buttonLong}
          disabled={events && events.length > 0 ? false : true}
          onClick={() => {
            handleClick('userRSVPs');
          }}
        >
          RSVPs
        </button>
        <button
          className={Styles.buttonLong}
          disabled={events && events.length > 0 ? false : true}
          onClick={() => {
            handleClick('userEvents');
          }}
        >
          Events
        </button>
        <button
          className={Styles.buttonLong}
          disabled={
            events &&
            events.filter((event) => event.organisers.includes(user._id))
              .length > 0
              ? false
              : true
          }
          onClick={() => {
            handleClick('userMyEvents');
          }}
        >
          My Events
        </button>
        <div className='mt-10 italic text-center'>
          <div>Don't have any events yet?</div>
          <div>Easy - create a new one or</div>
          <div>connect an invite you received.</div>
        </div>
        <button
          className={Styles.buttonLong}
          onClick={() => {
            handleClick('userCreate');
          }}
        >
          Create Event
        </button>
        <button
          className={Styles.buttonLong}
          onClick={() => {
            handleClick('connectInviteId');
          }}
        >
          Connect Event with Invite ID
        </button>
      </div>
      <div className={Styles.buttonContainer}>
        <button
          type='button'
          onClick={() => {
            logout();
          }}
          className={Styles.buttonColor}
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default UserDashboard;
