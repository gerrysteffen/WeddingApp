import React from 'react';
import Styles from '../../utils/styles';

function UserDashboard({ util, events }) {
  return (
    <>
      <h1 className={Styles.title}>
        Hello {util.user.firstName}
      </h1>
      <div className={Styles.bodyContainer}>
      <div className='italic text-center'>
          <div>
            Browse your profile and events...
          </div>
        </div>
        <button
          className={Styles.buttonLong}
          onClick={() => {
            util.setMode('userProfile');
          }}
        >
          My Profile
        </button>
        <button
          className={Styles.buttonLong}
          disabled={(events.length>0) ? false : true}
          onClick={() => {
            util.setMode('events');
          }}
        >
          Events
        </button>
        <button
          className={Styles.buttonLong}
          disabled={(events.length>0) ? false : true}
          onClick={() => {
            util.setMode('myevents');
          }}
        >
          My Events
        </button>
        <div className='mt-10 italic text-center'>
          <div>
            Don't have any events yet?
          </div>
          <div>
            Easy - create a new one or
          </div>
          <div>
            connect an invite you received.
          </div>
        </div>
        <button
          className={Styles.buttonLong}
          onClick={() => {
            util.setMode('create');
          }}
        >
          Create Event
        </button>
        <button className={Styles.buttonLong}>
          Connect Event with Invite ID
        </button>
      </div>
      <div className={Styles.buttonContainer}>
        <button
          type='button'
          onClick={() => {
            util.logout();
          }}
          className='w-full mt-4 border border-black p-2 bg-slate-400 rounded'
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default UserDashboard;
