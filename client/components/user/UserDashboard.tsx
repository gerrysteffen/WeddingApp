import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Styles from '../../utils/styles';
import { Store } from '../../types';
import { setUserMode } from '../../store/actions';

function UserDashboard() {
  const user = useSelector((state: Store) => state.user);
  const events = useSelector((state: Store) => state.events);

  const dispatch = useDispatch();

  const handleClick = (userMode: string) => {
    dispatch(setUserMode(userMode));
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
    </>
  );
}

export default UserDashboard;
