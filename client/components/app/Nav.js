import React from 'react';
import Styles from '../../utils/styles';
import { BiX, BiLogOut } from 'react-icons/bi';

function Nav({ util, events, event }) {
  const handleSelect = (mode) => {
    util.setMode(mode);
    util.setNavBarMode(false);
  }

  return (
    <div className='w-full h-full flex flex-col justify-between items-start p-2'>
      <div className='flex flex-col justify-start w-full'>
        <div className={Styles.navbarTitle}>
          <div className='font-bold'>User Options</div>
          <div className='ml-2'>
            {'- ' + util.user.firstName + ' ' + util.user.lastName}
          </div>
        </div>
        <button
          className={Styles.navbarContent}
          onClick={() => {
            handleSelect('userDashboard');
          }}
        >
          Dashboard
        </button>
        <button
          className={Styles.navbarContent}
          onClick={() => {
            handleSelect('userProfile');
          }}
        >
          My Profile
        </button>
        <button
          className={Styles.navbarContent}
          disabled={events.length > 0 ? false : true}
          onClick={() => {
            handleSelect('userEvents');
          }}
        >
          Events
        </button>
        <button
          className={Styles.navbarContent}
          disabled={events.length > 0 ? false : true}
          onClick={() => {
            handleSelect('userMyEvents');
          }}
        >
          My Events
        </button>
        <button
          className={Styles.navbarContent}
          disabled={events.length > 0 ? false : true}
          onClick={() => {
            handleSelect('userCreate');
          }}
        >
          Create Event
        </button>
        <button
          className={Styles.navbarContent}
          disabled={events.length > 0 ? false : true}
          onClick={() => {
            handleSelect('connectInviteId');
          }}
        >
          Connect Event with Invite ID
        </button>
        <div className={Styles.navbarTitle}>
          <div className='font-bold'>Event Options</div>
          {event && <div className='ml-2'>{'- ' + event.name}</div>}
        </div>
        {event ? (
          <>
            <button
              onClick={() => {
                handleSelect('eventDashboard');
              }}
              className={Styles.navbarContent}
            >
              Event Dashboard
            </button>
            <button
              onClick={() => {
                handleSelect('eventDetails');
              }}
              className={Styles.navbarContent}
            >
              Event Details
            </button>
            <button
              onClick={() => {
                handleSelect('eventParticipants');
              }}
              className={Styles.navbarContent}
            >
              Participants
            </button>
            <button
              onClick={() => {
                handleSelect('manageEvent');
              }}
              disabled={(event.organisers.includes(util.user._id)) ? false : true}
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
            util.setNavBarMode(false);
          }}
        >
          <BiX size='36px' />
          Exit
        </button>
        <button
          className={Styles.navbarBottom + ' mb-4 border-t-4'}
          onClick={() => {
            util.logout();
          }}
        >
          <BiLogOut size='30px' className='mr-2' /> Logout
        </button>
      </div>
    </div>
  );
}

export default Nav;
